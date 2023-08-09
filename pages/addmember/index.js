import Container from '@/component/Container'
import Header from '@/component/Header'
import AddMember from '@/component/member/AddMember'

const index = () => {
    return (
        <Container>
            {/*  Heading */}
            <Header mainheading="Add Member" tag1='memberlist' tag2="addmember" icon='bx-plus' />
            {/* End Heading */}

           <AddMember />
        </Container>
    )
}

export default index