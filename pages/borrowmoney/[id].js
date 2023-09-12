import Container from '@/component/Container'
import Header from '@/component/Header'
import UpdateBorrow from '@/component/boroow/UpdateBorrow';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Index = () => {
    const router  = useRouter();
    const { id } = router.query;
    

    return (
        <Container>
            {/* Heading */}
            <Header mainheading="Edit Payment" tag1='Edit Payment' />
            {/* End Heading */}

            <UpdateBorrow id={id} />

        </Container>
    )
}

export default Index