import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddReturnPayment from "@/component/MemberDashboard/ReturnPayment/AddReturnPayment";
import AllReturnPayments from "@/component/MemberDashboard/ReturnPayment/AllReturnPayments";
import UpdatePayment from "@/component/payment/UpdatePayment";
import PaymentHistory from "@/component/payment/PaymentHistory";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Payment History" tag1='All Payment' icon='bx-plus' btnname="Add New Payment" btnlink={`/memberdashboard/payments/addpayment/${id}`} />
      {/* End Heading */}

      <PaymentHistory />

    </MemberContainer>
  );
};

export default index;
