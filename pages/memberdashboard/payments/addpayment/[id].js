import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddPayment from "@/component/payment/AddPayment";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Add Payment" tag1='Payment list' tag2="Add Payment" icon='bx-plus' />
      {/* End Heading */}

      <AddPayment />


    </MemberContainer>
  );
};

export default index;
