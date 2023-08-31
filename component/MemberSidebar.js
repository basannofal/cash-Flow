import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { MdPeople } from "react-icons/md";

const MemberSidebar = ({ selectedMember, memberId, id }) => {
  const router = useRouter();
  const sideMenuRef = useRef(null);
  // logout code 
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("is_login");
    router.push("/login")
}

useEffect(() => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

    sideLinks.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', () => {
            sideLinks.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');
        })
    });
}, []);

  return (
    <div className="sidebar">
      <Link href="/" className="logo">
        <i className="bx bxs-caret-up-circle"></i>
        <div className="logo-name">
          <span>Cash</span>Flow
        </div>
      </Link>
      <ul className="side-menu" ref={sideMenuRef}>
        <li>
          <Link href={`/memberdashboard/${id}`}>
            <i className="bx bxs-dashboard"></i>Dashboard
          </Link>
        </li>
        {/* <li>
          <Link href={`/memberdetail/${id}`}>
            <i className="bx bx-analyse"> </i>Details
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/${id}`}>
            <i className="bx bx-group"></i>Credit / Debit
          </Link>
        </li> */}
        <li>
          <Link href={`/memberdashboard/payments/${id}`}>
            <i className="bx bx-message-square-dots"></i>Payments
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/borrows/${id}`}>
            <i className="bx bx-message-square-dots"></i>Borrow
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/allpayment/${id}`}>
            <i className="bx bx-message-square-dots"></i>Refund
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/borrowpayment/${id}`}>
            <i className="bx bx-message-square-dots"></i>Deposite
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <Link href="/memberlist">
            <i className="bx bx-home text-green-700"></i>
            <span className="text-green-700">Back To Member</span>
          </Link>
        </li>
        <li onClick={handleLogout}>
          <a href="#" className="logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MemberSidebar;
