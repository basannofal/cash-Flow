import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddReturnPayment from "@/component/MemberDashboard/ReturnPayment/AddReturnPayment";
import AllReturnPayments from "@/component/MemberDashboard/ReturnPayment/AllReturnPayments";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Refunded Payments" tag1="All Payments" btnname='Return Payment' btnlink={`/memberdashboard/allpayment/returnpayment/${id}`} icon='bx-plus' />
      {/* End Heading */}

      <AllReturnPayments mid={id} />
    </MemberContainer>
  );
};

export default Index;
