import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import AddBorrow from "@/component/MemberDashboard/Borrows/AddBorrow";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Add Borrow Payment" tag1='Borrow payment list' tag2="Add Borrow Payment" icon='bx-plus' />
      {/* End Heading */}

      <AddBorrow mid={id} />
      
    </MemberContainer>
  );
};

export default Index;
