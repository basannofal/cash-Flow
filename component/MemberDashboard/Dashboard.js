import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberAsync, fetchPerMemberAsync } from "@/store/slices/MemberSlice";
import { totalborrowdepositeAsync } from "@/store/slices/MemberBorrowDepositeSlice";
import { totalborrowpaymentAsync } from "@/store/slices/BorrowSlice";
import { totalreturnpaymentAsync } from "@/store/slices/ReturnPaymentSlice";
import { totalpaymentAsync } from "@/store/slices/PaymentSlice";
import InitialsAvatar from "../utilities/InitialsAvatar";
import { fetchAccountingDetailAsync } from "@/store/slices/Accounting";

const Dashboard = ({ memberId }) => {


  const totalreturnpayment = useSelector((state) => state.returnpayment.totalreturnpayment);
  const totalpayment = useSelector((state) => state.payment.totalpayment);
  const account = useSelector((state) => state.account.account);


  let totalborrowdeposite = useSelector((state) => state.borrowdeposite.totalborrowdepositepayment);
  let totalborrow = useSelector((state) => state.borrow.totalborrowpayment);




  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for filter visibility

  const memberData = useSelector((state) => state.member.permember);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPerMemberAsync(memberId));
      dispatch(totalborrowdepositeAsync(memberId));
      dispatch(totalborrowpaymentAsync(memberId))
      dispatch(totalreturnpaymentAsync(memberId));
      dispatch(totalpaymentAsync(memberId))
      dispatch(fetchAccountingDetailAsync(memberId))
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  const handleFilterIconClick = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the filter visibility
  };




  return (
    <>
      {/* Insights  */}
      <ul className="insights">
        <li>
          <i className="bx bx-calendar-check"></i>
          <span className="info">
            <h3>Borrowed</h3>
            <p>{totalborrow}</p>
          </span>
        </li>
        <li>
          <i className="bx bx-show-alt"></i>
          <span className="info">
            <h3>Deposited</h3>
            <p>{totalborrowdeposite}</p>
          </span>
        </li>
        <li>
          <i className="bx bx-line-chart"></i>
          <span className="info">
            <h3>Funds</h3>
            <p>{totalpayment}</p>
          </span>
        </li>
        <li>
          <i className="bx bx-dollar-circle"></i>
          <span className="info">
            <h3>Returned</h3>
            <p>{totalreturnpayment}</p>
          </span>
        </li>
      </ul>
      {/* End of Insights  */}

      {/* Filter */}
      <div className={`filter ${isFilterVisible ? "visible" : ""}`}>
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
        </select>
      </div>

      <div class="bottom-data">
        <div class="orders">
          <div className="header">
            <i className="bx bx-receipt"></i>
            <h3>Recent Orders</h3>
            <i
              className={`bx bx-filter ${isFilterVisible ? "active" : ""}`}
              onClick={handleFilterIconClick}
            ></i>
            <i className="bx bx-search"></i>
          </div>
          <table>
            <thead>

              <tr>
                <th>Transaction ID</th>
                <th>Payment Type</th>
                <th>Collected By</th>
                <th>Collected User</th>
                <th>Date</th>
                <th>Category</th>
                <th>Credit</th>
                <th>Debit</th>
              </tr>
            </thead>
            <tbody>
              {
                account.map((e, i) => {
                  return (

                    <tr>
                      <td>{e.id}</td>
                      <td>{e.table_name}</td>
                      <td>{e.collected_by}</td>
                      <td>{e.collected_user}</td>
                      <td>{e.date}</td>
                      <td>{e.cat_name}</td>
                      {
                        e.type == 1 ? <>
                          <td style={{ color: "green" }}>{e.amount}</td>
                          <td style={{ color: "red" }}>-</td>
                        </> : <>
                          <td style={{ color: "green" }}>-</td>
                          <td style={{ color: "red" }}>{e.amount}</td>
                        </>
                      }
                    </tr>
                  )
                })
              }
             
            </tbody>
          </table>

          {/* <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>Member Details</h3>
          </div>
          {memberData ? (
            <div>
              <h1>Member Dashboard for Member ID: {memberData.id}</h1>
              <p>
                Name:{" "}
                {`${memberData.fname} ${memberData.mname} ${memberData.lname}`}
              </p>
              <p>Address: {memberData.address}</p>
              <p>Number: {memberData.mobile_no}</p>
              <p>Email: {memberData.email}</p>
            </div>
          ) : (
            <p>Loading member data...{memberId}</p>
          )} */}
        </div>

        {/* End Display Data */}
      </div>
    </>
  );
};

export default Dashboard;
