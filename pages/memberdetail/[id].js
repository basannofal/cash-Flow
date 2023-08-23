import Container from "@/component/Container";
import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "@/component/MemberDashboard/Dashboard";
import MemberContainer from "@/component/MemberContainer";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Member Dashboard" />
      {/* End Heading */}

      <Dashboard memberId={id} />
    </MemberContainer>
  );
};

export default index;
