import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMemberAsync,
  fetchPerMemberAsync,
} from "@/store/slices/MemberSlice";
import { totalborrowdepositeAsync } from "@/store/slices/MemberBorrowDepositeSlice";
import { totalborrowpaymentAsync } from "@/store/slices/BorrowSlice";
import { totalreturnpaymentAsync } from "@/store/slices/ReturnPaymentSlice";
import { totalpaymentAsync } from "@/store/slices/PaymentSlice";
import InitialsAvatar from "../utilities/InitialsAvatar";
import { fetchAccountingDetailAsync } from "@/store/slices/Accounting";
import Pagination from "../Pagination";

const Dashboard = ({ memberId }) => {
  const totalreturnpayment = useSelector(
    (state) => state.returnpayment.totalreturnpayment
  );
  const totalpayment = useSelector((state) => state.payment.totalpayment);
  const account = useSelector((state) => state.account.account);

  let totalborrowdeposite = useSelector(
    (state) => state.borrowdeposite.totalborrowdepositepayment
  );
  let totalborrow = useSelector((state) => state.borrow.totalborrowpayment);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State for filter
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [NetProfit, setNetProfit] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPerMemberAsync(memberId));
      dispatch(totalborrowdepositeAsync(memberId));
      dispatch(totalborrowpaymentAsync(memberId));
      dispatch(totalreturnpaymentAsync(memberId));
      dispatch(totalpaymentAsync(memberId));
      dispatch(fetchAccountingDetailAsync(memberId));
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterIconClick = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the filter visibility
  };

  // Filtered data based on selected category
  const filteredAccount = account.filter((e) => {
    if (selectedCategory == "0") {
      return true;
    } else if (selectedCategory == "1") {
      return e.table_name == "Add Payment";
    } else if (selectedCategory == "2") {
      return e.table_name == "Refund Payment";
    } else if (selectedCategory == "3") {
      return e.table_name == "Borrow Payment";
    } else if (selectedCategory == "4") {
      return e.table_name == "Deposite Payment";
    }
  });

  useEffect(() => {
    // Calculate total credit and total debit here
    let creditTotal = 0;
    let debitTotal = 0;

    filteredAccount.forEach((e) => {
      if (e.type == 1) {
        creditTotal += e.amount;
      } else {
        debitTotal += e.amount;
      }
    });

    setTotalCredit(creditTotal);
    setTotalDebit(debitTotal);
    setNetProfit(creditTotal - debitTotal);
  }, [filteredAccount]); // Update totals when filteredAccount changes

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredAccount.slice(startIndex, endIndex);

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
          <option value="0">All</option>
          <option value="1">Add Payment</option>
          <option value="2">Refund Payment</option>
          <option value="3">Borrow Payment</option>
          <option value="4">Deposite Payment</option>
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
              {displayedData.map((e, i) => {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.table_name}</td>
                    <td>{e.collected_by}</td>
                    <td>{e.collected_user}</td>
                    <td>{e.date}</td>
                    <td>{e.cat_name}</td>
                    {e.type == 1 ? (
                      <>
                        <td style={{ color: "green" }}>{e.amount}</td>
                        <td style={{ color: "red" }}>-</td>
                      </>
                    ) : (
                      <>
                        <td style={{ color: "green" }}>-</td>
                        <td style={{ color: "red" }}>{e.amount}</td>
                      </>
                    )}
                  </tr>
                );
              })}

              <tr className="border-t-2 mt-4 border-gray-300">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Credit / Debit</td>
                <td style={{ color: "green" }}>{totalCredit}</td>
                <td style={{ color: "red" }}>{totalDebit}</td>
              </tr>

              <tr className="border-t-2 mt-4 border-gray-300">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Net</td>

                {NetProfit > 0 ? (
                  <>
                    <td style={{ color: "green" }}>{NetProfit}</td>
                    <td>-</td>
                  </>
                ) : (
                  <>
                    <td>-</td>
                    <td style={{ color: "red" }}>{NetProfit}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAccount.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />

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
