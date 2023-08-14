import Container from '@/component/Container'
import Header from '@/component/Header'
import UserList from '@/component/user/UserList';

const index = () => {

    return (

        <Container>
            {/*  Heading */}
            <Header mainheading="User" tag1='User List' />
            {/* End Heading */}

            {/* Display Data */}
            <UserList />
            {/* End Display Data */}
        </Container>

    )
}

export default index