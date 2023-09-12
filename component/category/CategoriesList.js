import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAsync, deleteCategoryAsync, editCategoryAsync, fetchCategoryAsync } from '@/store/slices/CategorySlice';
import SkeletonTable from '../skeleton/SkeletonTable';
import { BiMessageSquareEdit } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import ToastifyAlert from '../CustomComponent/ToastifyAlert';
import ReactDOM from "react-dom";
import { useFilterValue } from "../Container";
import Pagination from '../Pagination';
import CustomConfirm from '../CustomComponent/CustomConfirm';


const CategoriesList = () => {

    // Globel State Manegment
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // state
    const [catData, setCatData] = useState({
        categoryName: '',
        subcategory: 0
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [validationError, setValidationError] = useState('');
    const [handalationError, sethandalationError] = useState('');



    // Filteration Code
    const { filterValue, filterpagenumber } = useFilterValue();

    useEffect(() => {
        setCurrentPage(filterpagenumber)
    }, [filterValue]);
    // Remove the filter if the filter value is an empty string
    const filteredMembers = filterValue
        ? categories.filter((e) =>
            e.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        : categories;



    // hadnle input value when it is change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCatData({ ...catData, [name]: value })

    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryexist = categories.some(
            (m) =>
                // member.roll_no == rollno ||
                isFakeCategoryName ||
                (catData.categoryName == '')
        );
        if (categoryexist) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Category Already Exist...
            </div>);
            return;
        }
        if (isEditMode) {
            // Logic to handle category editing using the editingCategoryId

            try {
                dispatch(editCategoryAsync(editingCategoryId, catData))
                
                dispatch(fetchCategoryAsync())
                setValidationError('')
            } catch (err) {
                setValidationError(err)
            }

        } else {
            try {
                // Add Data Using Redux
                dispatch(addCategoryAsync(catData));

                setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                    <span class="font-medium">Success !</span> Category Added Successfully.
                </div>);
                dispatch(fetchCategoryAsync())
                setValidationError('')
            } catch (err) {
                setValidationError(err)
            }

        }
        setIsEditMode(false); // Reset edit mode
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
        setTimeout(() => {
            setValidationError('')
        }, 2000);
    }



    // delete Category
    const handleDelete = (id) => {
        ReactDOM.render(
            <CustomConfirm
                title="Delete Category"
                body={`Delete the Category from this table?`}
                button="Delete"
                onConfirm={async () => {
                    try {
                        // delete DAta using Redux
                        await dispatch(deleteCategoryAsync(id));
                        //Get Data USing Redux
                        await dispatch(fetchCategoryAsync());
                      
                        if ((filteredMembers.length % itemPerPage) == 1) {
                            if ((currentPage + 1) == numberOfPages) {
                                setCurrentPage(currentPage - 1);
                            }
                        }
                    } catch (err) {
                        console.log(err.response.data.msg)
                        sethandalationError(err.response.data.msg)
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
    };



    // Edit Category
    const handleEdit = (id) => {
        setIsEditMode(true);
        setEditingCategoryId(id);
        categories.map((e, i) => {
            if (id == e.id) {
                setCatData({
                    categoryName: e.name,
                    subcategory: e.subid || 0
                });
            }
        })
        setValidationError('')
    }


    // change Edit Mode
    const handleChangeMode = () => {
        setIsEditMode(false)
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
        setValidationError('')
    }



    // check for unique name
    const [isFakeCategoryName, setisFakeCategoryName] = useState(false);

    // check FullName is Unique
    useEffect(() => {
        if (isEditMode) {
            const CategoryNameExists = categories.some(
                (m) =>
                    m.id != editingCategoryId &&
                    m.name.toLowerCase() === catData.categoryName.trim().toLowerCase()
            );
            setisFakeCategoryName(CategoryNameExists)
        } else {
            const CategoryNameExists = categories.some(
                (m) =>
                    m.name.toLowerCase() === catData.categoryName.trim().toLowerCase()
            );
            setisFakeCategoryName(CategoryNameExists)
        }
    }, [catData.categoryName]);


    // Fetch cAtegory
    useEffect(() => {
        // Get Data Using Redux
        dispatch(fetchCategoryAsync())
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
        setCurrentPage(0); // Reset the active page to 0
    }, []);


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

    useEffect(() => {
        setTimeout(() => {
            sethandalationError('')
        }, 5000);
    }, [handalationError]);

    return (
        <>
            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>All Categories</h3>
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
                                                {e.sub_category == null
                                                    ?
                                                    <td>Null </td>
                                                    :
                                                    <td>{e.sub_category}</td>
                                                }
                                                {
                                                    isEditMode && editingCategoryId === e.id ?
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
                            (
                                <td colSpan="4" style={{ paddingTop: "1em" }}>
                                    <div> {/* Wrap the content in a div */}
                                        {categories.length === 0 ? (
                                            <SkeletonTable numRows={4} numColumns={2} color="#FF5555" />
                                        ) : (
                                            <div className='flex justify-center items-center'>
                                                <b className='text-red-500 m-8'>Categories Not found</b>
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
                    
                    {handalationError && <p className='text-red-600 mt-5' >{handalationError}</p>}

                </div>

                {/* Add Category  */}
                <div class="reminders">
                    <div class="header">
                        <i class='bx bxs-category'></i>
                        <h3>Categories</h3>
                        <i class='bx bx-plus' onClick={handleChangeMode}></i>
                    </div>

                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>
                            <div className={styles.input_box} >
                                <label>Category Name <span className='text-red-500'>*</span></label>
                                <input type="text" placeholder="Enter category name" name='categoryName' onChange={handleInputChange} value={catData.categoryName} required />
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mt-3">
                                    {catData.categoryName != '' ? (
                                        isFakeCategoryName ? (
                                            <p className=" text-white bg-red-500 p-1 " style={{ borderRadius: 5 }}>
                                                <b>{catData.categoryName}</b> is already exist.
                                            </p>
                                        ) : (
                                            <p className=" text-white bg-green-500 p-1" style={{ borderRadius: 5 }}>
                                                <b>{catData.categoryName}</b> not exist.
                                            </p>
                                        )
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles.input_box} >
                                <label className='mt-10'>Parent Category</label>
                                <div className={styles.select_box}>

                                    <select name='subcategory' value={catData.subcategory} onChange={handleInputChange}>
                                        <option value={0}>Null</option>
                                        {
                                            categories.map((e, i) => {
                                                if (e.id == editingCategoryId) {
                                                    return
                                                }
                                                return (
                                                    <option key={e.id} value={e.id}>{e.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>


                            {validationError && <p className='text-red-600 mt-5' >{validationError}</p>}

                            {catData.categoryName == '' ?
                                <button className='disable-btn'>{isEditMode ? "Edit Category" : "Add Category"}</button> : <button onClick={handleSubmit}>{isEditMode ? "Edit Category" : "Add Category"}</button>
                            }
                        </form>
                    </section>
                    <div id="CustomComponent"></div>
                </div>

                {/* End of Add Category */}

            </div>
        </>
    )
}

export default CategoriesList