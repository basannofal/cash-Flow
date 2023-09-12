import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddReturnPayment from "@/component/MemberDashboard/ReturnPayment/AddReturnPayment";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Return Payment" />
      {/* End Heading */}

      <AddReturnPayment mid={id} />
    </MemberContainer>
  );
};

export default Index;
