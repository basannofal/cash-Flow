import Container from "@/component/Container";
import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "@/component/MemberDashboard/Dashboard";
import MemberContainer from "@/component/MemberContainer";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header
        mainheading="Member Dashboard"
        tag1="Dashboard"
        tag2={"Member Details"}
      />
      {/* End Heading */}

      <Dashboard memberId={id} />
    </MemberContainer>
  );
};

export default Index;
