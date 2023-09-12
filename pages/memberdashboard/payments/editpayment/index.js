import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import UpdatePayment from "@/component/MemberDashboard/Payments/UpdatePayment";

const Index = () => {
  const router = useRouter();
  const {  id, mid } = router.query;

  return (
    <MemberContainer id={mid}>
      {/* Heading */}
      <Header mainheading="Edit Return Payment" />
      {/* End Heading */}

      <UpdatePayment mid={mid} id={id} />
    </MemberContainer>
  );
};

export default Index;
