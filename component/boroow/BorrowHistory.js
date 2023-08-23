import React, { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '../skeleton/SkeletonTable';
import Link from 'next/link';
import { deleteBorrowAsync, fetchBorrowAsync } from '@/store/slices/BorrowSlice';
import { useFilterValue } from '../Container';
import Pagination from '../Pagination';
import ReactDOM from "react-dom";
import ToastifyAlert from '../CustomComponent/ToastifyAlert';
import CustomConfirm from '../CustomComponent/CustomConfirm';


const BorrowHistory = () => {
    // Globel State Manegment
    const dispatch = useDispatch();
    const payment = useSelector((state) => state.payment.payment);
    const borrow = useSelector((state) => state.borrow.borrow);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // Filteration Code
    const filterValue = useFilterValue();
    // Remove the filter if the filter value is an empty string
    const filteredMembers = filterValue
        ? borrow.filter((e) => {
            const fullName = `${e.fname} ${e.mname} ${e.lname}`.toLowerCase();
            return fullName.includes(filterValue.toLowerCase()) ||
            e.nickname.toLowerCase().includes(filterValue.toLowerCase());
        }
        )
        : borrow;



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
                title="Delete Borrow"
                body={`Delete the Borrow from this table?`}
                button="Delete"
                onConfirm={async () => {
                    try {
                        dispatch(deleteBorrowAsync(id))
                        ReactDOM.render(
                            <ToastifyAlert
                                type={errortype}
                                message={errormsg}
                            />,
                            document.getElementById("CustomComponent")
                        );
                    } catch (error) {
                        ReactDOM.render(
                            <ToastifyAlert
                                type={errortype}
                                message={errormsg}
                            />,
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
        dispatch(fetchBorrowAsync())
    }


    useEffect(() => {
        dispatch(fetchBorrowAsync())
    }, []);
    return (
        <>
            {/* Display Data */}

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Borrow Payment History</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bail Name</th>
                                <th>Amount</th>
                                <th>Collected By</th>
                                <th>Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {rows.length > 0 ?
                            <tbody>
                                {
                                    rows.map((e, i) => {
                                        return (
                                            <tr key={e.id}>
                                                <td>
                                                    <img src="images/profile-1.jpg" />
                                                    <p>{`${e.fname} ${e.mname} ${e.lname}`}</p>
                                                </td>
                                                <td>{`${e.bail_fname} ${e.bail_mname} ${e.bail_lname}`}</td>
                                                <td>{e.amount} </td>
                                                <td>{e.given_by} </td>
                                                <td>{e.date} </td>
                                                <td>
                                                    <Link href={`/borrowmoney/${e.id}`}>
                                                        <BiMessageSquareEdit className='bx' />
                                                    </Link>
                                                </td>

                                                <td onClick={() => { handleDelete(e.id) }}><MdOutlineDeleteForever className='bx' /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            :
                            <SkeletonTable numberOfRows={5} numberOfColumns={6} />
                        }
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
    )
}

export default BorrowHistory
