import Container from '@/component/Container'
import Header from '@/component/Header'
import AddPayment from '@/component/payment/AddPayment'

const index = () => {
    return (
        <Container>
            {/*  Heading */}
            <Header mainheading="Add Payment" tag1='Payment list' tag2="Add Payment" icon='bx-plus' />
            {/* End Heading */}

           <AddPayment />
        </Container>
    )
}

export default index