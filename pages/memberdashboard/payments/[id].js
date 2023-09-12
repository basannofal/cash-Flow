import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import PaymentHistory from "@/component/MemberDashboard/Payments/PaymentHistory";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Payment History" tag1='All Payment' icon='bx-plus' btnname="Add New Payment" btnlink={`/memberdashboard/payments/addpayment/${id}`} />
      {/* End Heading */}

      <PaymentHistory mid={id} />

    </MemberContainer>
  );
};

export default Index;
