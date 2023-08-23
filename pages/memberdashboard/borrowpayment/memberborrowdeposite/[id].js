import Container from "@/component/Container";
import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "@/component/MemberDashboard/Dashboard";
import MemberContainer from "@/component/MemberContainer";
import AddBorrowDeposite from "@/component/MemberDashboard/BorrowDeposite/AddBorrowDeposite";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Member Borrow Deposite" />
      {/* End Heading */}

      <AddBorrowDeposite mid={id} />
    </MemberContainer>
  );
};

export default index;
