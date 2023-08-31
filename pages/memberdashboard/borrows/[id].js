import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddReturnPayment from "@/component/MemberDashboard/ReturnPayment/AddReturnPayment";
import AllReturnPayments from "@/component/MemberDashboard/ReturnPayment/AllReturnPayments";
import BorrowHistory from "@/component/boroow/BorrowHistory";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Borrow History" tag1='All Payments' icon='bx-plus' btnname="Add New Borrow Payment" btnlink={`/memberdashboard/borrows/addborrow/${id}`} />
      {/* End Heading */}

      <BorrowHistory />

    </MemberContainer>
  );
};

export default index;
