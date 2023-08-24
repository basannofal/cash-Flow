
import { deleteMemberAsync, fetchMemberAsync } from '@/store/slices/MemberSlice';
import React, { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import CustomConfirm from '@/component/CustomComponent/CustomConfirm';
import Pagination from '@/component/Pagination';
import SkeletonTable from '@/component/skeleton/SkeletonTable';
import { deleteReturnPaymentAsync, fetchPerReturnPaymentAsync } from '@/store/slices/ReturnPaymentSlice';

const AllReturnPayments = ({mid}) => {
    // Globel State Manegment
    const dispatch = useDispatch();
    const returnpayment = useSelector((state) => state.returnpayment.perreturnpayment);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // pagination
    const itemPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = currentPage * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const rows = returnpayment.slice(startIndex, endIndex);

    const numberOfPages = Math.ceil(returnpayment.length / itemPerPage);
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
                        dispatch(deleteReturnPaymentAsync(id))
                        ReactDOM.render(
                            <ToastifyAlert
                                type={errortype}
                                message={errormsg}
                            />,
                            document.getElementById("CustomComponent")
                        );
                        dispatch(fetchPerReturnPaymentAsync(mid))
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
        if (mid) {  // Check if mid is available before dispatching the action
            dispatch(fetchPerReturnPaymentAsync(mid));
        }
    }, [mid]);
    return (
        <>
            {/* Display Data */}

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>Total Borrow Deposite Payment</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Amount</th>
                                <th>Withdrawer</th>
                                <th>Returner</th>
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
                                               <td>{e.id}</td>
                                                <td>{e.amount} </td>
                                                <td>{e.withdrawer_name} </td>
                                                <td>{e.returned_user} </td>
                                                <td>{e.date}</td>



                                                <td>
                                                    <Link href={`/memberlist/${e.id}`}>
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

export default AllReturnPayments