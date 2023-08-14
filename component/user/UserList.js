import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '@/component/skeleton/SkeletonTable';
import { BiMessageSquareEdit } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { addUserAsync, deleteUserAsync, editUserAsync, fetchUserAsync } from '@/store/slices/UserSlice';

const UserList = () => {

    // Globel State Manegment
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)



    // state
    const [userData, setUserData] = useState({
        name: '',
        number: '',
        email: '',
        username: '',
        password: '',
        isAdmin: '',
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);



    // hadnle input value when it is change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Logic to handle category editing using the editingUserId
            dispatch(editUserAsync(editingUserId, userData))
        } else {
            // Add Data Using Redux
            dispatch(addUserAsync(userData));
        }

        dispatch(fetchUserAsync()); // Refetch data
        setIsEditMode(false); // Reset edit mode
        setUserData({ name: '', number: '', email: '', username: '', password: '', isAdmin: ''
        });
    }


    // delete Category
    const handleDelete = (id) => {
        // delete DAta using Redux
        dispatch(deleteUserAsync(id));
        //Get Data USing Redux
        dispatch(fetchUserAsync());
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
    }


    // change Edit Mode
    const handleChangeMode = () => {
        setIsEditMode(false)
        setUserData({ name: '', number: '', email: '', username: '', password: '', isAdmin: ''})
    }


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
                        {user.length > 0 ?
                            <tbody>
                                {
                                    user.map((e, i) => {
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

                                                <td onClick={() => { handleDelete(e.id) }}><MdOutlineDeleteForever className='bx' /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            :
                            <SkeletonTable numberOfRows={5} numberOfColumns={4} />
                        }
                    </table>
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
                                <label>Full Name</label>
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
                                <label>Username</label>
                                <input type="text" placeholder="Enter Username" name='username' onChange={handleInputChange} value={userData.username} required />
                            </div>

                            <div className={styles.input_box} >
                                <label>Password</label>
                                <input type="text" placeholder="Enter Password" name='password' onChange={handleInputChange} value={userData.password} required />
                            </div>

                            <div className={styles.gender_box}>
                                <h3>Auth</h3>
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


                            {userData.name == '' || userData.number == '' || userData.email == '' || userData.username == '' || userData.password == '' ?
                                <button className='disable-btn'>{isEditMode ? "Edit User" : "Add User"}</button> : <button onClick={handleSubmit}>{isEditMode ? "Edit User" : "Add User"}</button>
                            }
                        </form>
                    </section>
                </div>

                {/* End of Add User */}

            </div>
        </>
    )
}

export default UserList