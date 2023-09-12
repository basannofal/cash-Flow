import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import UpdateBorrow from "@/component/MemberDashboard/Borrows/UpdateBorrow";

const Index = () => {
  const router = useRouter();
  const {  id, mid, bid } = router.query;

  return (
    <MemberContainer id={mid}>
      {/* Heading */}
      <Header mainheading="Edit Payment" tag1='Edit Payment'  />
      {/* End Heading */}
      <UpdateBorrow mid={mid} id={id} bid={bid} />

    </MemberContainer>
  );
};

export default Index;
