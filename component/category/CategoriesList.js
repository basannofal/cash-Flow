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



    // Filteration Code
    const filterValue = useFilterValue();
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

        if (isEditMode) {
            // Logic to handle category editing using the editingCategoryId
            try {
                dispatch(editCategoryAsync(editingCategoryId, catData))
                ReactDOM.render(
                    <ToastifyAlert
                        type={errortype}
                        message={errormsg}
                    />,
                    document.getElementById("CustomComponent")
                );
            } catch (err) {
                ReactDOM.render(
                    <ToastifyAlert
                        type={errortype}
                        message={errormsg}
                    />,
                    document.getElementById("CustomComponent")
                );
            }
        } else {
            try {
                // Add Data Using Redux
                dispatch(addCategoryAsync(catData));
                ReactDOM.render(
                    <ToastifyAlert
                        type={errortype}
                        message={errormsg}
                    />,
                    document.getElementById("CustomComponent")
                );
            } catch (err) {
                ReactDOM.render(
                    <ToastifyAlert
                        type={errortype}
                        message={errormsg}
                    />,
                    document.getElementById("CustomComponent")
                );
            }
        }

        try {
            dispatch(fetchCategoryAsync()); // Refetch data
        } catch (err) {
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
        }
        setIsEditMode(false); // Reset edit mode
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
    }



    // delete Category
    const handleDelete = (id) => {
        ReactDOM.render(
            <CustomConfirm
                title="Delete Category"
                body={`Delete the Category  from this table?`}
                button="Delete"
                onConfirm={async () => {
                    try {
                        // delete DAta using Redux
                        await dispatch(deleteCategoryAsync(id));
                        ReactDOM.render(
                            <ToastifyAlert
                                type={errortype}
                                message={errormsg}
                            />,
                            document.getElementById("CustomComponent")
                        );
                        //Get Data USing Redux
                        await dispatch(fetchCategoryAsync());
                        if ((filteredMembers.length % itemPerPage) == 1) {
                            setCurrentPage(currentPage - 1);
                        }
                    } catch (err) {
                        ReactDOM.render(
                            <ToastifyAlert
                                type={errortype}
                                message={errormsg}
                            />,
                            document.getElementById("CustomComponent")
                        );
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
    }


    // change Edit Mode
    const handleChangeMode = () => {
        setIsEditMode(false)
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
    }


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
                                <label>Category Name</label>
                                <input type="text" placeholder="Enter category name" name='categoryName' onChange={handleInputChange} value={catData.categoryName} required />
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