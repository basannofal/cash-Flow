import Container from '@/component/Container'
import Header from '@/component/Header'
import CategoriesList from '@/component/category/CategoriesList';

const index = () => {

    return (

        <Container>
            {/*  Heading */}
            <Header mainheading="Category" tag1='Category List' />
            {/* End Heading */}

            {/* Display Data */}
            <CategoriesList />
            {/* End Display Data */}
        </Container>

    )
}

export default index