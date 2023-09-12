import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddPayment from "@/component/MemberDashboard/Payments/AddPayment";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Add Payment" tag1='Payment list' tag2="Add Payment" icon='bx-plus' />
      {/* End Heading */}

      <AddPayment mid={id} />


    </MemberContainer>
  );
};

export default Index;
