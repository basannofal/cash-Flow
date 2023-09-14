import React, { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  deletePaymentAsync,
  fetchPaymentAsync,
  fetchPerMemberPaymentAsync,
} from "@/store/slices/PaymentSlice";
import ReactDOM from "react-dom";
import CustomConfirm from "@/component/CustomComponent/CustomConfirm";
import ToastifyAlert from "@/component/CustomComponent/ToastifyAlert";
import Pagination from "@/component/Pagination";
import SkeletonTable from "@/component/skeleton/SkeletonTable";

const PaymentHistory = ({ mid }) => {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payment.permemberpayment);
  const errormsg = useSelector((state) => state.error.error.msg);
  const errortype = useSelector((state) => state.error.error.type);

  // filter code
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const filteredRows = payment.filter((item) => {
    if (!startDate || !endDate) {
      // If start date or end date is not set, show all records
      return true;
    }
    // Format the payment date to "yyyy-mm-dd" for comparison
    const formattedDate = item.date.split("-").reverse().join("-");
    const found = formattedDate >= startDate && formattedDate <= endDate;
    return found;
  });
  const recordsFound = filteredRows.length > 0;
  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const rows = filteredRows.slice(startIndex, endIndex);
  const numberOfPages = Math.ceil(filteredRows.length / itemPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPerMemberPaymentAsync(mid));
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    ReactDOM.render(
      <CustomConfirm
        title="Delete Borrow"
        body={`Delete the Borrow from this table?`}
        button="Delete"
        onConfirm={async () => {
          try {
            await dispatch(deletePaymentAsync(id));
            await dispatch(fetchPerMemberPaymentAsync(mid));

            if (filteredMembers.length % itemPerPage == 1) {
              if (currentPage + 1 == numberOfPages) {
                setCurrentPage(currentPage - 1);
              }
            }
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
          } catch (error) {
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
          }
        }}
        onClose={() => {
          ReactDOM.unmountComponentAtNode(
            document.getElementById("CustomComponent")
          );
        }}
      />,
      document.getElementById("CustomComponent")
    );
  };

  // visible or non visible filter code
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleFilterIconClick = () => {
    setIsFilterVisible(!isFilterVisible); // Toggle the filter visibility
  };

  return (
    <>
      {/*  filter by date inputs  */}
      <div className={`filter ${isFilterVisible ? "visible" : ""}`}>
        <div class="row" style={{ display: "flex" }}>
          <h5 class="pt-3 pl-5" style={{ fontWeight: "bolder" }}>
            Filter by Date Range :{" "}
          </h5>
          <div class="group ml-5">
            <label>FROM : </label>
            <input
              placeholder="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                marginBottom: "20px",
                outline: "0",
                width: "20rem",
                backgroundColor: "transparent",
              }}
            />
            <label class="pl-3">TO : </label>

            <input
              placeholder="End Date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                marginBottom: "20px",
                outline: "0",
                width: "20rem",
                backgroundColor: "transparent",
              }}
            />
            <label
              style={{
                fontSize: "14px",
                color: "rgb(99, 102, 102)",
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "#fff",
                transition: "all .3s ease",
              }}
            >
              Search Record
            </label>
          </div>
        </div>
      </div>

      <div className="bottom-data">
        <div className="orders">
          <div className="header">
            <i className="bx bx-receipt"></i>
            <h3>All History</h3>
            <i
              className={`bx bx-filter ${isFilterVisible ? "active" : ""}`}
              onClick={handleFilterIconClick}
            ></i>
            <i className="bx bx-search"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category Name</th>
                <th>Amount</th>
                <th>Collected By</th>
                <th>Note</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {rows.length > 0 ? (
              <tbody>
                {rows.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>&#8377; {e.amount} </td>
                      <td>{e.category_name}</td>
                      <td>{e.collected_by} </td>
                      <td>{e.note} </td>
                      <td>{e.date}</td>
                      <td>
                        <Link
                          href={`/memberdashboard/payments/editpayment?mid=${mid}&id=${e.id}`}
                        >
                          <BiMessageSquareEdit className="bx" />
                        </Link>
                      </td>
                      <td
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                      >
                        <MdOutlineDeleteForever className="bx" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : !recordsFound || payment.length === 0 ? (
              <td colSpan="7" style={{ paddingTop: "1em" }}>
                <div>
                  <div className="flex justify-center items-center">
                    <b className="text-red-500 m-8">Payment Data Not found</b>
                  </div>
                </div>
              </td>
            ) : (
              <SkeletonTable numRows={4} numColumns={2} color="#FF5555" />
            )}
          </table>
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={numberOfPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div id="CustomComponent"></div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
