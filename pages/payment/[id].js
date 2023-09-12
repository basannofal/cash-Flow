import Container from '@/component/Container'
import Header from '@/component/Header'
import UpdatePayment from '@/component/payment/UpdatePayment';
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

            <UpdatePayment id={id} />

        </Container>
    )
}

export default Index