import Container from '@/component/Container'
import Header from '@/component/Header'
import MemberList from '@/component/member/MemberList'

const index = () => {
    return (
        <Container>
            {/* Heading */}
            <Header mainheading="Member List" tag1='memberlist' icon='bx-plus' btnname="Add Member" btnlink='/addmember' />
            {/* End Heading */}

          <MemberList />
        </Container>
    )
}

export default index