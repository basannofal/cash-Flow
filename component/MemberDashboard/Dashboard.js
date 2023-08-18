import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberAsync } from "@/store/slices/MemberSlice";

const Dashboard = ({ memberId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemberAsync());
  }, []);

  const memberData = useSelector((state) => state.member.member);
  const selectedMember = memberData.find((member) => member.id == memberId);

  console.log("Member Data:", memberData); // Check the contents of memberData
  console.log("Selected Member:", selectedMember); // Check the selected member

  return (
    <div>
      {selectedMember ? (
        <div>
          <h1>Member Dashboard for Member ID: {selectedMember.id}</h1>
          <p>Name: {selectedMember.name}</p>
          <p>Address: {selectedMember.address}</p>
          <p>Number: {selectedMember.mobile_no}</p>
          <p>Email: {selectedMember.email}</p>
          {/* Display additional dashboard content */}
        </div>
      ) : (
        <p>Loading member data...</p>
      )}
    </div>
  );
};

export default Dashboard;
