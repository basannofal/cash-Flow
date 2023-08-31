import { fetchPerMemberAsync } from "@/store/slices/MemberSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MemberNavbar = ({ onFilterChange }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;

    const memberData = useSelector((state) => state.member.permember);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPerMemberAsync(id));
        };

        fetchData(); // Call the async function to fetch data
    }, []);



    return (
        <>
            {/* Navbar  */}
            <nav>
                <i className="bx bx-menu"></i>

             
                {memberData && (
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "x-large",
                            margin: "auto",
                            fontWeight: "bolder",
                        }}
                    >
                        {`${memberData.fname} ${memberData.mname} ${memberData.lname}`}
                    </h1>
                )}
                {/* <label htmlFor="theme-toggle" className="theme-toggle"></label> */}
            </nav>

            {/* End of Navbar  */}
        </>
    );
};

export default MemberNavbar;



