
import { deleteMemberAsync, fetchMemberAsync } from '@/store/slices/MemberSlice';
import React, { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonTable from '../skeleton/SkeletonTable';
import Link from 'next/link';

const MemberList = () => {
    // Globel State Manegment
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.member);

    // Delete Member
    const handleDelete = (id) => {
        dispatch(deleteMemberAsync(id))
        dispatch(fetchMemberAsync())
    }


    useEffect(() => {
        dispatch(fetchMemberAsync())
    }, []);
    return (
        <>
            {/* Display Data */}

            <div class="bottom-data">
                <div class="orders">
                    <div class="header">
                        <i class='bx bx-receipt'></i>
                        <h3>All Members</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-search'></i>
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
                        {member.length > 0 ?
                            <tbody>
                                {
                                    member.map((e, i) => {
                                        return (
                                            <tr key={e.id}>
                                                <td>
                                                    <img src="images/profile-1.jpg" />
                                                    <p>{e.name}</p>
                                                </td>
                                                <td>{e.address} </td>
                                                <td>{e.mobile_no} </td>
                                                <td>{e.email} </td>



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
                </div>


                {/* End Display Data */}

            </div>

        </>
    )
}

export default MemberList