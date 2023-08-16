import React, { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '../skeleton/SkeletonTable';
import Link from 'next/link';
import { deleteBorrowAsync, fetchBorrowAsync } from '@/store/slices/BorrowSlice';

const BorrowHistory = () => {
    // Globel State Manegment
    const dispatch = useDispatch();
    const payment = useSelector((state) => state.payment.payment);
    const borrow = useSelector((state) => state.borrow.borrow);

    // Delete Member
    const handleDelete = (id) => {
        dispatch(deleteBorrowAsync(id))
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
                                <th>Amount</th>
                                <th>Collected By</th>
                                <th>Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {borrow.length > 0 ?
                            <tbody>
                                {
                                    borrow.map((e, i) => {
                                        return (
                                            <tr key={e.id}>
                                                <td>
                                                    <img src="images/profile-1.jpg" />
                                                    <p>{e.amount}</p>
                                                </td>
                                                <td>{e.amount} </td>
                                                <td>{e.given_by} </td>
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
                            <SkeletonTable numberOfRows={5} numberOfColumns={6} />
                        }
                    </table>
                </div>


                {/* End Display Data */}

            </div>

        </>
    )
}

export default BorrowHistory
