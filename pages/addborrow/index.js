import Container from '@/component/Container'
import Header from '@/component/Header'
import AddBorrow from '@/component/boroow/AddBorrow'

const index = () => {
    return (
        <Container>
            {/*  Heading */}
            <Header mainheading="Add Borrow Payment" tag1='Borrow payment list' tag2="Add Borrow Payment" icon='bx-plus' />
            {/* End Heading */}

           <AddBorrow />
        </Container>
    )
}

export default index