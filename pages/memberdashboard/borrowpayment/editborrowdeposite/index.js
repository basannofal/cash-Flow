import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import EditBorrowDeposite from "@/component/MemberDashboard/BorrowDeposite/EditBorrowDeposite";

const Index = () => {
  const router = useRouter();
  const { mid, id } = router.query;

  return (
    <MemberContainer id={mid}>
      {/* Heading */}
      <Header mainheading="Edit Borrow Deposite"  />
      {/* End Heading */}

      <EditBorrowDeposite mid={mid} id={id} />
    </MemberContainer>
  );
};

export default Index;
