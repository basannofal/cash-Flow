import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import EditReturnPayment from "@/component/MemberDashboard/ReturnPayment/EditReturnPayment";

const Index = () => {
  const router = useRouter();
  const { mid, id } = router.query;

  return (
    <MemberContainer id={mid}>
      {/* Heading */}
      <Header mainheading="Edit Return Payment"  />
      {/* End Heading */}

      <EditReturnPayment mid={mid} id={id} />
    </MemberContainer>
  );
};

export default Index;
