import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddReturnPayment from "@/component/MemberDashboard/ReturnPayment/AddReturnPayment";

const index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="All Payments" tag1="All Payments" btnname='Return Payment' btnlink={`/memberdashboard/allpayment/returnpayment/${id}`} icon='bx-plus' />
      {/* End Heading */}

      {/* <AddReturnPayment mid={id} /> */}
    </MemberContainer>
  );
};

export default index;
