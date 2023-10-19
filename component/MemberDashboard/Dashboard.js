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
  const totalfunds = useSelector((state) => state.payment.totalfunds);
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

  const categories = Array.from(new Set(account.map((e) => e.cat_name)));
  const [selectedCategoryFunds, setSelectedCategoryFunds] = useState("All");
  const [isFilterVisibleFunds, setIsFilterVisibleFunds] = useState(false);

  const calculateTotalPaymentForCategory = (category) => {
    if (category === "All") {
      // Calculate total Funds for all categories
      return account.reduce((total, payment) => {
        if (payment.cat_name === "Fund Payment") {
          return total + payment.amount;
        }
        return totalfunds;
      }, 0);
    } else {
      // Calculate total Funds for the selected category
      return account
        .filter(
          (e) => e.cat_name === category && e.table_name === "Fund Payment"
        )
        .reduce((total, payment) => {
          return total + payment.amount;
        }, 0);
    }
  };

  // Use totalFunds wherever you want to display the total Funds.

  const handleCategoryChangeFunds = (category) => {
    setSelectedCategoryFunds(category);
  };

  const handleFilterIconClickFunds = () => {
    setIsFilterVisibleFunds(!isFilterVisibleFunds); // Toggle the filter visibility
  };

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
      return e.table_name == "Fund Payment";
    } else if (selectedCategory == "2") {
      return e.table_name == "Refund Payment";
    } else if (selectedCategory == "3") {
      return e.table_name == "Borrow Payment";
    } else if (selectedCategory == "4") {
      return e.table_name == "RePay Payment";
    }
  });

  useEffect(() => {
    // Calculate total credit and total debit here (excluding "Lillah" category)
    let creditTotal = 0;
    let debitTotal = 0;

    filteredAccount.forEach((e) => {
      if (e.type == 1) {
        // Check if the category is not "Lillah" before adding to creditTotal
        if (e.cat_name != "lillah") {
          creditTotal += e.amount;
        }
      } else {
        // Check if the category is not "Lillah" before adding to debitTotal
        if (e.cat_name != "lillah") {
          debitTotal += e.amount;
        }
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

  const categoryLabels = {
    0: "All Ledger",
    1: "Fund Ledger",
    2: "Refund Ledger",
    3: "Borrow Ledger",
    4: "RePay Ledger",
  };

  const calculateNetPayment = (paymentType, amount, category) => {
    let netPayment = 0;

    if (paymentType === "Fund Payment" || paymentType === "RePay Payment") {
      netPayment = amount;
    } else if (paymentType === "Refund Payment") {
      netPayment = netPayment - amount;
    } else if (paymentType === "Borrow Payment") {
      netPayment = netPayment - amount;
    }

    // If the category is "lillah," always consider it as credit
    if (category === "lillah") {
      netPayment = Math.abs(netPayment);
    }

    return netPayment;
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
        {/* <li>
          <i className="bx bx-filter"></i>
          <span className="info">
            <h3>Funds</h3>
            <p>{totalpayment}</p>
          </span>
        </li> */}
        <li>
          <i className="bx bx-filter" onClick={handleFilterIconClickFunds}></i>
          <span className="info">
            <h3>Funds</h3>
            <p>{calculateTotalPaymentForCategory(selectedCategoryFunds)}</p>
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

      {/* Filter Total Category Payment */}
      <div className={`filter ${isFilterVisibleFunds ? "visible" : ""}`}>
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategoryFunds}
          onChange={(e) => handleCategoryChangeFunds(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Filter */}
      <div className={`filter ${isFilterVisible ? "visible" : ""}`}>
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="0">All Payment</option>
          <option value="1">Fund</option>
          <option value="2">Refund</option>
          <option value="3">Borrow</option>
          <option value="4">RePay</option>
        </select>
      </div>

      <div class="bottom-data">
        <div class="orders">
          <div className="header">
            <i className="bx bx-receipt"></i>
            <h3>{categoryLabels[selectedCategory]}</h3>
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
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((e, i) => {
                const netPayment = calculateNetPayment(
                  e.table_name,
                  e.amount,
                  e.cat_name
                );
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
                        <td style={{ color: netPayment < 0 ? "red" : "green" }}>
                          {netPayment}
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ color: "green" }}>-</td>
                        <td style={{ color: "red" }}>{e.amount}</td>
                        <td style={{ color: netPayment < 0 ? "red" : "green" }}>
                          {netPayment}
                        </td>
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
                <th>Date</th>
                <th>Payment Mode</th>
                <th>Credit</th>
                <th>Debit</th>
              </tr>
              <tr>
                <td>1</td>
                <td>14-08-2023</td>
                <td>Fund</td>
                <td style={{ color: "green" }}>22300</td>
                <td style={{ color: "red" }}>18000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>20-09-2023</td>
                <td>Refund</td>
                <td style={{ color: "green" }}>46800</td>
                <td style={{ color: "red" }}>19000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>19-09-2023</td>
                <td>Borrowed</td>
                <td style={{ color: "green" }}>58000</td>
                <td style={{ color: "red" }}>78000</td>
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
