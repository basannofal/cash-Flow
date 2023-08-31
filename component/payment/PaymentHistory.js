import React, { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '../skeleton/SkeletonTable';
import Link from 'next/link';
import { deletePaymentAsync, fetchPaymentAsync } from '@/store/slices/PaymentSlice';
import { useFilterValue } from '../Container';
import Pagination from '../Pagination';
import ReactDOM from "react-dom";
import ToastifyAlert from '../CustomComponent/ToastifyAlert';
import CustomConfirm from '../CustomComponent/CustomConfirm';

const PaymentHistory = () => {
    // Globel State Manegment
    const dispatch = useDispatch();
    const payment = useSelector((state) => state.payment.payment);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // Filteration Code
    const filterValue = useFilterValue();
    // Remove the filter if the filter value is an empty string
    const filteredMembers = filterValue
        ? payment.filter((e) => {
            const fullName = `${e.fname} ${e.mname} ${e.lname}`.toLowerCase();
            return fullName.includes(filterValue.toLowerCase()) ||
            e.nickname.toLowerCase().includes(filterValue.toLowerCase());
        }
        )
        : payment;



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

                        await dispatch(deletePaymentAsync(id))
                        await dispatch(fetchPaymentAsync())
                        if ((filteredMembers.length % itemPerPage) == 1) {
                            setCurrentPage(currentPage - 1);
                        }
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
    }


    useEffect(() => {
        dispatch(fetchPaymentAsync())
    }, []);
    return (
        <>
            {/* Display Data */}

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>All History</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category Name</th>
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
                                                <td>{e.category_name}</td>
                                                <td>{e.amount} </td>
                                                <td>{e.collected_by} </td>
                                                <td>{e.date} </td>
                                                <td>
                                                    <Link href={`/payment/${e.id}`}>
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
                            (
                                <td colSpan="4" style={{ paddingTop: "1em" }}>
                                    <div> {/* Wrap the content in a div */}
                                        {payment.length === 0 ? (
                                            <SkeletonTable numRows={4} numColumns={2} color="#FF5555" />
                                        ) : (
                                            <div className='flex justify-center items-center'>
                                                <b className='text-red-500 m-8'>Payment Data Not found</b>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            )
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

export default PaymentHistory