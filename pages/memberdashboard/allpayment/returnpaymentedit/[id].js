import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import EditReturnPayment from "@/component/MemberDashboard/ReturnPayment/EditReturnPayment";

const index = () => {
  const router = useRouter();
  const { did, id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Edit Return Payment" />
      {/* End Heading */}

      <EditReturnPayment mid={id} did={did} />
    </MemberContainer>
  );
};

export default index;
