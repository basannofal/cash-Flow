import Container from '@/component/Container'
import Header from '@/component/Header'
import UpdateMember from '@/component/member/UpdateMember';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const Index = () => {
    const router  = useRouter();
    const { id } = router.query;
    

    return (
        <Container>
            {/* Heading */}
            <Header mainheading="Edit Member" tag1='Edit Member' />
            {/* End Heading */}

            <UpdateMember id={id} />

        </Container>
    )
}

export default Index