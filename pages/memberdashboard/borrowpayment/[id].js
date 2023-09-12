import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AllBorrowDeposite from "@/component/MemberDashboard/BorrowDeposite/AllBorrowDeposite";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Deposite Payments" tag1="Borrow Deposite Payments" btnname='Add Deposite' btnlink={`/memberdashboard/borrowpayment/memberborrowdeposite/${id}`} icon='bx-plus' />
      {/* End Heading */}

      <AllBorrowDeposite mid={id} />
    </MemberContainer>
  );
};

export default Index;
