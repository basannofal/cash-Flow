import React, { useState } from 'react'
import styles from '@/styles/form.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAsync, fetchCategoryAsync } from '@/store/slices/CategorySlice';

const CategoriesList = ({data}) => {
    
    
    // Globel State Manegment
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);



    // state
    const [catData, setCatData] = useState({
        categoryName: '',
        subcategory: 0
    });


    // hadnle input value when it is change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCatData({ ...catData, [name]: value })

    }

    // add category
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add Data Using Redux
        dispatch(addCategoryAsync(catData));
        // Get Data Using Redux
        dispatch(fetchCategoryAsync())
    }
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
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((e, i) => {
                                    return (
                                        <tr key={e.id}>
                                            <td><p>{e.name}</p></td>
                                            {e.sub_category == null
                                                ?
                                                <td>Null </td>
                                                :
                                                <td>{e.sub_category}</td>
                                            }
                                            <td><span class="status completed">Completed</span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* Add Category  */}
                <div class="reminders">
                    <div class="header">
                        <i class='bx bxs-category'></i>
                        <h3>Categories</h3>
                        <i class='bx bx-plus'></i>
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
                                        <option value={1}>Sadka</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleSubmit}>Add Category</button>
                        </form>
                    </section>
                </div>

                {/* End of Add Category */}

            </div>
        </>
    )
}

export default CategoriesList