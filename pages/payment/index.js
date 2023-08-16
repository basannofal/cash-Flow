import Container from '@/component/Container'
import Header from '@/component/Header'
import MemberList from '@/component/member/MemberList'
import PaymentHistory from '@/component/payment/PaymentHistory'

const index = () => {
    return (
        <Container>
            {/* Heading */}
            <Header mainheading="Payment History" tag1='All Payment' icon='bx-plus' btnname="Add New Payment" btnlink='/addpayment' />
            {/* End Heading */}

          <PaymentHistory />
        </Container>
    )
}

export default index