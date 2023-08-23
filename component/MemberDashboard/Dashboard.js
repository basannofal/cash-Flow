import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberAsync, fetchPerMemberAsync } from "@/store/slices/MemberSlice";

const Dashboard = ({ memberId }) => {
  const dispatch = useDispatch();
  console.log(memberId);

  const memberData = useSelector((state) => state.member.permember);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPerMemberAsync(memberId));
    };

    fetchData(); // Call the async function to fetch data
  }, []);

  // const selectedMember = memberData.find((member) => member.id == memberId);

  return (
    <div class="bottom-data">
      <div class="orders">
        <div class="header">
          <i class='bx bx-receipt'></i>
          <h3>Member Details</h3>
        </div>
        {memberData ? (
          <div>
            <h1>Member Dashboard for Member ID: {memberData.id}</h1>
            <p>Name: {memberData.name}</p>
            <p>Address: {memberData.address}</p>
            <p>Number: {memberData.mobile_no}</p>
            <p>Email: {memberData.email}</p>
            {/* Display additional dashboard content */}
          </div>
        ) : (
          <p>Loading member data...{memberId}</p>
        )}

      </div>


      {/* End Display Data */}

    </div>
  );
};

export default Dashboard;
