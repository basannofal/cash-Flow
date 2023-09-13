import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '@/component/skeleton/SkeletonTable';
import { BiMessageSquareEdit } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { addUserAsync, deleteUserAsync, editUserAsync, fetchUserAsync } from '@/store/slices/UserSlice';
import ToastifyAlert from '../CustomComponent/ToastifyAlert';
import ReactDOM from "react-dom";
import { useFilterValue } from "../Container";
import Pagination from '../Pagination';
import CustomConfirm from '../CustomComponent/CustomConfirm';

const UserList = () => {

    // Globel State Manegment
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // state
    const [userData, setUserData] = useState({
        name: '',
        number: '',
        email: '',
        username: '',
        password: '',
        isAdmin: 0,
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [validationError, setValidationError] = useState('');






    // Filteration Code
    const { filterValue, filterpagenumber } = useFilterValue();

    useEffect(() => {
        setCurrentPage(filterpagenumber)
    }, [filterValue]);
    // Remove the filter if the filter value is an empty string
    const filteredMembers = filterValue
        ? user.filter((e) =>
            e.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        : user;



    // pagination
    const itemPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = currentPage * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const rows = filteredMembers.slice(startIndex, endIndex);

    const numberOfPages = Math.ceil(filteredMembers.length / itemPerPage);
    const pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // hadnle input value when it is change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault();
        const userexist = user.some(
            (m) =>
                // member.roll_no == rollno ||
                isFakeUserName ||
                (userData.username == '')
        );
        if (userexist) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Username Already Exist...
            </div>);
            return;
        }
        if (isEditMode) {

            try {
                // Logic to handle category editing using the editingUserId
                dispatch(editUserAsync(editingUserId, userData))
                setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                    <span class="font-medium">Success !</span> User Updated Successfully.
                </div>);
                
            } catch (error) {
                console.log(error);
                setValidationError(error.response.data.msg)
            }
        } else {
            try {
                // Add Data Using Redux
                dispatch(addUserAsync(userData));
                setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                    <span class="font-medium">Success !</span> User Added Successfully.
                </div>);
            } catch (error) {
                setValidationError(error.response.data.msg)
            }
        }

        dispatch(fetchUserAsync()); // Refetch data
        setIsEditMode(false); // Reset edit mode
        setUserData({
            name: '', number: '', email: '', username: '', password: '', isAdmin: 0
        });
        setTimeout(() => {
            setValidationError('')
        }, 2000);
    }


    // delete Category
    const handleDelete = (id) => {

        ReactDOM.render(
            <CustomConfirm
                title="Delete User"
                body={`Delete the User from this table?`}
                button="Delete"
                onConfirm={async () => {
                    try {
                        // delete DAta using Redux
                        dispatch(deleteUserAsync(id));
                        //Get Data USing Redux
                        dispatch(fetchUserAsync());

                        if ((filteredMembers.length % itemPerPage) == 1) {
                            if ((currentPage + 1) == numberOfPages) {
                                setCurrentPage(currentPage - 1);
                            }
                        }
                    } catch (err) {
                        setValidationError(err.response.data.msg)
                    }
                }}
                onClose={() => {
                    // if once click cancel button so, Close the modal
                    // Close the modal using ReactDOM.unmountComponentAtNode
                    ReactDOM.unmountComponentAtNode(
                        document.getElementById("CustomComponent")
                    );
                }}
            />,
            document.getElementById("CustomComponent") // root element
        );


    }



    // Edit Category
    const handleEdit = (id) => {
        setIsEditMode(true);
        setEditingUserId(id);
        user.map((e, i) => {
            if (id == e.id) {
                console.log(e);
                setUserData({
                    name: e.name,
                    number: e.number,
                    email: e.email,
                    username: e.username,
                    password: e.password,
                    isAdmin: e.is_admin
                });
            }
        })
        setValidationError('')
    }


    // change Edit Mode
    const handleChangeMode = () => {
        setIsEditMode(false)
        setUserData({ name: '', number: '', email: '', username: '', password: '', isAdmin: '' })
        setValidationError('')
    }



    // check for unique name
    const [isFakeUserName, setisFakeUserName] = useState(false);

    // check FullName is Unique
    useEffect(() => {
        if (isEditMode) {
            const userNameExists = user.some(
                (m) =>
                    m.id != editingUserId &&
                    m.username.toLowerCase() === userData.username.trim().toLowerCase()
            );
            setisFakeUserName(userNameExists)
        } else {
            const userNameExists = user.some(
                (m) =>
                    m.username.toLowerCase() === userData.username.trim().toLowerCase()
            );
            setisFakeUserName(userNameExists)
            console.log(userNameExists);
        }
    }, [userData.username]);



    // Fetch cAtegory
    useEffect(() => {
        // Get Data Using Redux
        dispatch(fetchUserAsync())
        console.log(user);
    }, []);

    return (
        <>
            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>All User</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sub Category</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {rows.length > 0 ?
                            <tbody>
                                {
                                    rows.map((e, i) => {
                                        return (
                                            <tr key={e.id}>
                                                <td><p>{e.name}</p></td>
                                                <td>{e.email}</td>
                                                {
                                                    isEditMode && editingUserId === e.id ?
                                                        <td></td>
                                                        :
                                                        <td onClick={() => { handleEdit(e.id) }}><BiMessageSquareEdit className='bx' /></td>
                                                }
                                                {/* <td onClick={() => { handleEdit(e.id) }}><BiMessageSquareEdit className='bx' /></td> */}
                                                { e.id != 1 ?
                                                <td onClick={() => { handleDelete(e.id) }}><MdOutlineDeleteForever className='bx' /></td> : ""
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            :
                            (
                                <td colSpan="4" style={{ paddingTop: "1em" }}>
                                    <div> {/* Wrap the content in a div */}
                                        {user.length === 0 ? (
                                            <SkeletonTable numRows={4} numColumns={2} color="#FF5555" />
                                        ) : (
                                            <div className='flex justify-center items-center'>
                                                <b className='text-red-500 m-8'>User Not found</b>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            )
                        }
                    </table>
                    {/* pagination start */}
                    <div className="pagination-container">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={numberOfPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    {/* pagination End */}
                </div>

                {/* Add Category  */}
                <div class="reminders">
                    <div class="header">
                        <i class='bx bxs-user'></i>
                        <h3>User</h3>
                        <i class='bx bx-plus' onClick={handleChangeMode}></i>
                    </div>

                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>
                            <div className={styles.input_box} >
                                <label>Full Name <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder="Enter full name" name='name' onChange={handleInputChange} value={userData.name} required />
                            </div>

                            <div className={styles.input_box} >
                                <label>Number</label>
                                <input type="text" placeholder="Enter Number" name='number' onChange={handleInputChange} value={userData.number} required />
                            </div>

                            <div className={styles.input_box} >
                                <label>Email</label>
                                <input type="text" placeholder="Enter Email" name='email' onChange={handleInputChange} value={userData.email} required />
                            </div>

                            <div className={styles.input_box} >
                                <label>Username <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder="Enter Username" name='username' onChange={handleInputChange} value={userData.username} required />
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mt-3">
                                    {userData.username != '' ? (
                                        isFakeUserName ? (
                                            <p className=" text-white bg-red-500 p-1 " style={{ borderRadius: 5 }}>
                                                <b>{userData.username}</b> is already exist.
                                            </p>
                                        ) : (
                                            <p className=" text-white bg-green-500 p-1" style={{ borderRadius: 5 }}>
                                                <b>{userData.username}</b> not exist.
                                            </p>
                                        )
                                    ) : null}
                                </div>
                            </div>


                            <div className={styles.input_box} >
                                <label>Password <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder="Enter Password" name='password' onChange={handleInputChange} value={userData.password} required />
                            </div>

                            <div className={styles.gender_box}>
                                <h3>Auth <span className='text-red-500'>*</span></h3>
                                <div className={styles.gender_option}>
                                    <div className={styles.gender}>
                                        <input
                                            type="radio"
                                            id="check-admin"
                                            name="isAdmin"
                                            value="1"
                                            checked={userData.isAdmin == "1"}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="check-admin">Admin</label>
                                    </div>
                                    <div className={styles.gender}>
                                        <input
                                            type="radio"
                                            id="check-user"
                                            name="isAdmin"
                                            value="0"
                                            checked={userData.isAdmin == "0"}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="check-user">User</label>
                                    </div>
                                </div>
                            </div>

                            {validationError && <p className='text-red-600 mt-5' >{validationError}</p>}

                            {userData.name == '' || userData.username == '' || userData.password == '' ?
                                <button className='disable-btn'>{isEditMode ? "Edit User" : "Add User"}</button> : <button onClick={handleSubmit}>{isEditMode ? "Edit User" : "Add User"}</button>
                            }
                        </form>
                    </section>
                    <div id="CustomComponent"></div>
                </div>

                {/* End of Add User */}

            </div>
        </>
    )
}

export default UserList