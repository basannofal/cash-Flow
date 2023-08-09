import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAsync, deleteCategoryAsync, editCategoryAsync, fetchCategoryAsync } from '@/store/slices/CategorySlice';
import SkeletonTable from '../skeleton/SkeletonTable';
import { BiMessageSquareEdit } from 'react-icons/bi'
import { MdOutlineDeleteForever } from 'react-icons/md'

const CategoriesList = () => {

    // Globel State Manegment
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);



    // state
    const [catData, setCatData] = useState({
        categoryName: '',
        subcategory: 0
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);


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
            dispatch(editCategoryAsync(editingCategoryId, catData))
        } else {
            // Add Data Using Redux
            dispatch(addCategoryAsync(catData));
        }

        dispatch(fetchCategoryAsync()); // Refetch data
        setIsEditMode(false); // Reset edit mode
        setCatData({ categoryName: '', subcategory: 0 }); // Reset form fields
    }


    // delete Category
    const handleDelete = (id) => {
        // delete DAta using Redux
        dispatch(deleteCategoryAsync(id));
        //Get Data USing Redux
        dispatch(fetchCategoryAsync());
    }



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
    }, []);

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
                        {categories.length > 0 ?
                            <tbody>
                                {
                                    categories.map((e, i) => {
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
                            <SkeletonTable numberOfRows={5} numberOfColumns={4} />
                        }
                    </table>
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
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter full name" name='categoryName' onChange={handleInputChange} value={catData.categoryName} required />
                            </div>

                            <div className={styles.input_box} >
                                <label className='m-10'>Parent Category</label>
                                <div className={styles.select_box}>

                                    <select name='subcategory' value={catData.subcategory} onChange={handleInputChange}>
                                        <option value={0}>Null</option>
                                        {
                                            categories.map((e, i) => {
                                                if(e.id == editingCategoryId){
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

                            { catData.categoryName == '' ? 
                                <button className='disable-btn'>{isEditMode ? "Edit Category" : "Add Category"}</button> : <button onClick={handleSubmit}>{isEditMode ? "Edit Category" : "Add Category"}</button>
                            }
                        </form>
                    </section>
                </div>

                {/* End of Add Category */}

            </div>
        </>
    )
}

export default CategoriesList