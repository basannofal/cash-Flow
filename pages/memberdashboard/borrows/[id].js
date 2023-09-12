import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import BorrowHistory from "@/component/MemberDashboard/Borrows/BorrowHistory";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Borrow History" tag1='All Payments' icon='bx-plus' btnname="Add New Borrow Payment" btnlink={`/memberdashboard/borrows/addborrow/${id}`} />
      {/* End Heading */}

      <BorrowHistory mid={id} />

    </MemberContainer>
  );
};

export default Index;
