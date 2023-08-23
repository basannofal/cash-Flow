import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AllBorrowDeposite from "@/component/MemberDashboard/BorrowDeposite/AllBorrowDeposite";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Borrows Payments" tag1="All Borrow Payments" btnname='Add Deposite' btnlink={`/memberdashboard/borrowpayment/memberborrowdeposite/${id}`} icon='bx-plus' />
      {/* End Heading */}

      <AllBorrowDeposite mid={id} />
    </MemberContainer>
  );
};

export default index;
