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
import { useFilterValue } from "@/component/Container";
import Pagination from "@/component/Pagination";
import SkeletonTable from "@/component/skeleton/SkeletonTable";
import {
  deleteBorrowDepositeAsync,
  fetchPerMemberBorrowDepositeAsync,
  totalborrowdepositeAsync,
} from "@/store/slices/MemberBorrowDepositeSlice";
import { totalborrowpaymentAsync } from "@/store/slices/BorrowSlice";

const AllBorrowDeposite = ({ mid }) => {
  // Globel State Manegment
  const dispatch = useDispatch();
  const borrowdeposite = useSelector(
    (state) => state.borrowdeposite.permemberborrowdeposite
  );
  const errormsg = useSelector((state) => state.error.error.msg);
  const errortype = useSelector((state) => state.error.error.type);

  const totalborrowdeposite = useSelector(
    (state) => state.borrowdeposite.totalborrowdepositepayment
  );
  const totalborrow = useSelector((state) => state.borrow.totalborrowpayment);

  // pagination
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const rows = borrowdeposite.slice(startIndex, endIndex);

  const numberOfPages = Math.ceil(borrowdeposite.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete Member
  const handleDelete = (id) => {
    ReactDOM.render(
      <CustomConfirm
        title="Delete Borrow Deposite"
        body={`Delete the Borrow Deposite from this table?`}
        button="Delete"
        onConfirm={async () => {
          try {
            await dispatch(deleteBorrowDepositeAsync(id));
            ReactDOM.render(
              <ToastifyAlert type={errortype} message={errormsg} />,
              document.getElementById("CustomComponent")
            );
            await dispatch(fetchPerMemberBorrowDepositeAsync(mid));
            await dispatch(totalborrowdepositeAsync(mid));
            await dispatch(totalborrowpaymentAsync(mid));
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
      dispatch(fetchPerMemberBorrowDepositeAsync(mid));
      dispatch(totalborrowdepositeAsync(mid));
      dispatch(totalborrowpaymentAsync(mid));
    }
  }, [mid]);
  return (
    <>
      {/* Display Data */}

      <div class="bottom-data">
        <div class="orders">
          <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>Borrow Deposite Payment</h3>
            <h1>
              Deposited = {totalborrowdeposite}{" "}
              <span className="text-red-500"> | </span> Borrow = {totalborrow}{" "}
              <span className="text-red-500"> | </span>Total ={" "}
              <span className="text-red-500">
                {" "}
                {totalborrow - totalborrowdeposite}
              </span>{" "}
            </h1>
            {/* <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i> */}
          </div>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Depositer</th>
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
                      <td>{e.deposite_by} </td>
                      <td>{e.note} </td>
                      <td>{parsedDate.toString().slice(0, 10)}</td>

                      <td>
                        <Link
                          href={`/memberdashboard/borrowpayment/editborrowdeposite?mid=${mid}&id=${e.id}`}
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
            ) : borrowdeposite.length == 0 ? (
              <td colSpan="7" style={{ paddingTop: "1em" }}>
                <div>
                  {" "}
                  {/* Wrap the content in a div */}
                  <div className="flex justify-center items-center">
                    <b className="text-red-500 m-8">
                      Deposite Payment Data Not found
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

export default AllBorrowDeposite;
