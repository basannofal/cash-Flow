import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { MdPeople } from "react-icons/md";

const MemberSidebar = ({ selectedMember, memberId, id }) => {
  const router = useRouter();
  const sideMenuRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("is_login");
    router.push("/login");
  };

  useEffect(() => {
    const sideLinks = sideMenuRef.current.querySelectorAll(
      ".side-menu li a:not(.logout)"
    );

    const handleClick = (item) => {
      sideLinks.forEach((i) => {
        i.parentElement.classList.remove("active");
      });
      item.parentElement.classList.add("active");
    };

    sideLinks.forEach((item) => {
      item.addEventListener("click", () => handleClick(item));
    });

    return () => {
      sideLinks.forEach((item) => {
        item.removeEventListener("click", () => handleClick(item));
      });
    };
  }, []);

  return (
    <div className="sidebar">
      <Link href="/" className="logo">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>Asmr</span>Prog
        </div>
      </Link>
      <ul className="side-menu" ref={sideMenuRef}>
        <li>
          <Link href={`/memberdashboard/${id}`}>
            <i className="bx bxs-dashboard"></i>Dashboard
          </Link>
        </li>
        <li>
          <Link href={`/memberdetail/${id}`}>
            <i className="bx bx-analyse"> </i>Details
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/${id}`}>
            <i className="bx bx-group"></i>Credit / Debit
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/returnpayment/${id}`}>
            <i className="bx bx-message-square-dots"></i>Return Payment
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/memberborrowdeposite/${id}`}>
            <i className="bx bx-message-square-dots"></i>Borrow Deposite
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
