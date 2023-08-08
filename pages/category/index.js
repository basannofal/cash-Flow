import Container from '@/component/Container'
import Header from '@/component/Header'
import styles from '@/styles/form.module.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAsync, fetchCategoryAsync } from '@/store/slices/CategorySlice';
import CategoriesList from '@/component/category/CategoriesList';

const index = () => {

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


    // Fetch cAtegory
    useEffect(() => {
        // Get Data Using Redux
        dispatch(fetchCategoryAsync())
        console.log(categories);
    }, []);

    return (

        <Container>
            {/*  Heading */}
            <Header mainheading="Category" tag1='Category List' />
            {/* End Heading */}

            {/* Display Data */}
            <CategoriesList data={categories} />
            {/* End Display Data */}
        </Container>

    )
}

export default index