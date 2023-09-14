import {
  deleteMemberAsync,
  fetchMemberAsync,
} from "@/store/slices/MemberSlice";
import React, { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import ReactDOM from "react-dom";
import ToastifyAlert from "@/component/CustomComponent/ToastifyAlert";
import CustomConfirm from "@/component/CustomComponent/CustomConfirm";
import Pagination from "@/component/Pagination";
import SkeletonTable from "@/component/skeleton/SkeletonTable";
import {
  deleteReturnPaymentAsync,
  fetchPerMemberReturnPaymentAsync,
  totalreturnpaymentAsync,
} from "@/store/slices/ReturnPaymentSlice";
import { totalpaymentAsync } from "@/store/slices/PaymentSlice";

const AllReturnPayments = ({ mid }) => {
  // Globel State Manegment
  const dispatch = useDispatch();
  const returnpayment = useSelector(
    (state) => state.returnpayment.permemberreturnpayment
  );
  const totalreturnpayment = useSelector(
    (state) => state.returnpayment.totalreturnpayment
  );
  const totalpayment = useSelector((state) => state.payment.totalpayment);
  const errormsg = useSelector((state) => state.error.error.msg);
  const errortype = useSelector((state) => state.error.error.type);

  // filter code
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const filteredRows = returnpayment.filter((item) => {
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

  // Delete Member
  const handleDelete = (id) => {
    ReactDOM.render(
      <CustomConfirm
        title="Delete Return Payment"
        body={`Delete the Return Payment from this table?`}
        button="Delete"
        onConfirm={async () => {
          try {
            await dispatch(deleteReturnPaymentAsync(id));
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
            await dispatch(fetchPerMemberReturnPaymentAsync(mid));
            await dispatch(totalreturnpaymentAsync(mid));
            await dispatch(totalpaymentAsync(mid));

            if (filteredMembers.length % itemPerPage == 1) {
              if (currentPage + 1 == numberOfPages) {
                setCurrentPage(currentPage - 1);
              }
            }
          } catch (error) {
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
          }
        }}
        onClose={() => {
          // if once click cancel button so, Close the modal
          // Close the modal using ReactDOM.unmountComponentAtNode
          ReactDOM.unmountComponentAtNode(
            document.getElementById("CustomComponent")
          );
        }}
      />,
      document.getElementById("CustomComponent") // root element
    );
  };

  useEffect(() => {
    if (mid) {
      // Check if mid is available before dispatching the action
      dispatch(fetchPerMemberReturnPaymentAsync(mid));
      dispatch(totalreturnpaymentAsync(mid));
      dispatch(totalpaymentAsync(mid));
    }
  }, [mid]);

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

      <div class="bottom-data">
        <div class="orders">
          <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>Refund Payments </h3>
            <h1>
              Refunded = {totalreturnpayment}{" "}
              <span className="text-green-500"> | </span> Wallet ={" "}
              {totalpayment} <span className="text-green-500"> | </span>Total ={" "}
              <span className="text-green-500">
                {" "}
                {totalpayment - totalreturnpayment}
              </span>{" "}
            </h1>
            <i
              className={`bx bx-filter ${isFilterVisible ? "active" : ""}`}
              onClick={handleFilterIconClick}
            ></i>
            {/* <i class='bx bx-search'></i>  */}
          </div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Amount</th>
                <th>Withdrawer</th>
                <th>Returner</th>
                <th>Note</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {rows.length > 0 ? (
              <tbody>
                {rows.map((e, i) => {
                  const parsedDate = e.date;

                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>&#8377; {e.amount} </td>
                      <td>{e.withdrawer_name} </td>
                      <td>{e.returned_user} </td>
                      <td>{e.note} </td>
                      <td>{parsedDate.toString().slice(0, 10)}</td>

                      <td>
                        <Link
                          href={`/memberdashboard/allpayment/returnpaymentedit?mid=${mid}&id=${e.id}`}
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
            ) : returnpayment.length == 0 || !recordsFound ? (
              <td colSpan="7" style={{ paddingTop: "1em" }}>
                <div>
                  {" "}
                  {/* Wrap the content in a div */}
                  <div className="flex justify-center items-center">
                    <b className="text-red-500 m-8">
                      Refund Payment Data Not found
                    </b>
                  </div>
                </div>
              </td>
            ) : (
              <SkeletonTable numRows={4} numColumns={2} color="#FF5555" />
            )}
          </table>
          {/* pagination start */}
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={numberOfPages}
              onPageChange={handlePageChange}
            />
          </div>
          {/* pagination End */}
          <div id="CustomComponent"></div>
        </div>

        {/* End Display Data */}
      </div>
    </>
  );
};

export default AllReturnPayments;
