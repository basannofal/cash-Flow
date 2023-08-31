import Header from "@/component/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MemberContainer from "@/component/MemberContainer";
import UpdateBorrow from "@/component/boroow/UpdateBorrow";

const index = () => {
  const router = useRouter();
  const { did, id } = router.query;

  return (
    <MemberContainer id={id}>
      {/* Heading */}
      <Header mainheading="Edit Payment" tag1='Edit Payment' />
      {/* End Heading */}
      <UpdateBorrow id={id} />

    </MemberContainer>
  );
};

export default index;
