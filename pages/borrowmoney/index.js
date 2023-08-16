import Container from '@/component/Container'
import Header from '@/component/Header'
import BorrowHistory from '@/component/boroow/BorrowHistory'

const index = () => {
    return (
        <Container>
            {/* Heading */}
            <Header mainheading="Borrow History" tag1='All Payments' icon='bx-plus' btnname="Add New Borrow Payment" btnlink='/addborrow' />
            {/* End Heading */}

          <BorrowHistory />
        </Container>
    )
}

export default index