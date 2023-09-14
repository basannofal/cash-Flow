import React, { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  deleteBorrowAsync,
  fetchPerMemberBorrowAsync,
} from "@/store/slices/BorrowSlice";
import ReactDOM from "react-dom";
import CustomConfirm from "@/component/CustomComponent/CustomConfirm";
import ToastifyAlert from "@/component/CustomComponent/ToastifyAlert";
import { useFilterValue } from "@/component/Container";
import Pagination from "@/component/Pagination";
import SkeletonTable from "@/component/skeleton/SkeletonTable";

const BorrowHistory = ({ mid }) => {
  // Globel State Manegment
  const dispatch = useDispatch();
  const borrow = useSelector((state) => state.borrow.permemberborrow);
  const errormsg = useSelector((state) => state.error.error.msg);
  const errortype = useSelector((state) => state.error.error.type);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  // filter code
  const filteredRows = borrow.filter((item) => {
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
        title="Delete Borrow"
        body={`Delete the Borrow from this table?`}
        button="Delete"
        onConfirm={async () => {
          try {
            dispatch(deleteBorrowAsync(id));
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
            await dispatch(fetchPerMemberBorrowAsync(mid));

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
    const fetchData = async () => {
      dispatch(fetchPerMemberBorrowAsync(mid));
    };
    fetchData();
  }, []);

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
            <h3>Borrow Payment History</h3>
            <i
              className={`bx bx-filter ${isFilterVisible ? "active" : ""}`}
              onClick={handleFilterIconClick}
            ></i>
            <i class="bx bx-search"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Bail Name</th>
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
                  const parsedDate = e.date;
                  return (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>&#8377; {e.amount} </td>
                      <td>{`${e.bail_fname} ${e.bail_mname} ${e.bail_lname}`}</td>
                      <td>{e.given_by} </td>
                      <td>{e.note} </td>
                      <td>{parsedDate.toString().slice(0, 10)}</td>
                      <td>
                        <Link
                          href={`/memberdashboard/borrows/editborrow?mid=${mid}&id=${e.id}&bid=${e.bail_m_id}`}
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
            ) : borrow.length == 0 || !recordsFound ? (
              <td colSpan="7" style={{ paddingTop: "1em" }}>
                <div>
                  {" "}
                  {/* Wrap the content in a div */}
                  <div className="flex justify-center items-center">
                    <b className="text-red-500 m-8">
                      Borrow Payment Data Not found
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

export default BorrowHistory;
