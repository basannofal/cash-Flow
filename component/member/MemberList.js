import {
  deleteMemberAsync,
  fetchMemberAsync,
} from "@/store/slices/MemberSlice";
import React, { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import SkeletonTable from "../skeleton/SkeletonTable";
import Link from "next/link";
import { useFilterValue } from "../Container";
import Pagination from "../Pagination";
import ReactDOM from "react-dom";
import ToastifyAlert from "../CustomComponent/ToastifyAlert";
import CustomConfirm from "../CustomComponent/CustomConfirm";
import InitialsAvatar from "../utilities/InitialsAvatar";

const MemberList = () => {
  // Globel State Manegment
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member.member);
  const errormsg = useSelector((state) => state.error.error.msg);
  const errortype = useSelector((state) => state.error.error.type);

  // Filteration Code
  const { filterValue, filterpagenumber } = useFilterValue();
  const [handalationError, sethandalationError] = useState("");

  useEffect(() => {
    setCurrentPage(filterpagenumber);
  }, [filterValue]);
  // Remove the filter if the filter value is an empty string
  const filteredMembers = filterValue
    ? member.filter((e) => {
        const fullName = `${e.fname} ${e.mname} ${e.lname}`.toLowerCase();
        return (
          fullName.includes(filterValue.toLowerCase()) ||
          e.nickname.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    : member;

  // pagination
  const itemPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const rows = filteredMembers.slice(startIndex, endIndex);

  const numberOfPages = Math.ceil(filteredMembers.length / itemPerPage);
  const pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete Member
  const handleDelete = (id) => {
    ReactDOM.render(
      <CustomConfirm
        title="Delete Member"
        body={`Delete the Member from this table?`}
        button="Delete"
        onConfirm={async () => {
          try {
            await dispatch(deleteMemberAsync(id));
            await dispatch(fetchMemberAsync());
            if (filteredMembers.length % itemPerPage == 1) {
              if (currentPage + 1 == numberOfPages) {
                setCurrentPage(currentPage - 1);
              }
            }
          } catch (error) {
            console.log(error);
            sethandalationError(error.response.data.msg);
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
    dispatch(fetchMemberAsync());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      sethandalationError("");
    }, 5000);
  }, [handalationError]);

  return (
    <>
      {/* Display Data */}

      <div class="bottom-data">
        <div class="orders">
          <div class="header">
            <i class="bx bx-receipt"></i>
            <h3>All Members</h3>
            <i class="bx bx-filter"></i>
            <i class="bx bx-search"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Number</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {rows.length > 0 ? (
              <tbody>
                {rows.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <Link href={`/memberdashboard/${e.id}`}>
                        <td>
                          <InitialsAvatar fullName={e.fname} />
                          <p>{`${e.fname} ${e.mname} ${e.lname}`}</p>
                        </td>
                      </Link>
                      <td>{e.address} </td>
                      <td>{e.mobile_no} </td>
                      <td>{e.email} </td>

                      <td>
                        <Link href={`/memberlist/${e.id}`}>
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
            ) : (
              <td colSpan="4" style={{ paddingTop: "1em" }}>
                <div>
                  {" "}
                  {/* Wrap the content in a div */}
                  {member.length === 0 ? (
                    <SkeletonTable numRows={5} numColumns={6} color="#FF5555" />
                  ) : (
                    <div className="flex justify-center items-center">
                      <b className="text-red-500 m-8">Member Not found</b>
                    </div>
                  )}
                </div>
              </td>
            )}
          </table>
          {/* pagination start */}
          <div className="pagination-container">
            {numberOfPages > 1 && ( // Only render pagination if there's more than one page
              <Pagination
                currentPage={currentPage}
                totalPages={numberOfPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          {/* pagination End */}
          <div id="CustomComponent"></div>

          {handalationError && (
            <p className="text-red-600 mt-5">{handalationError}</p>
          )}
        </div>

        {/* End Display Data */}
      </div>
    </>
  );
};

export default MemberList;
