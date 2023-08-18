import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { MdPeople } from "react-icons/md";

const MemberSidebar = ({ selectedMember, memberId }) => {
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
      <a href="#" className="logo">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>Asmr</span>Prog
        </div>
      </a>
      <ul className="side-menu" ref={sideMenuRef}>
        <li>
          <Link href={`/memberdashboard/${selectedMember}`}>
            <i className="bx bxs-dashboard"></i>M Dashboard
          </Link>
        </li>
        <li>
          <Link href="">
            <i className="bx bx-analyse"> </i>M Details
          </Link>
        </li>
        <li>
          <Link href="">
            <i className="bx bx-group"></i>M Credit
          </Link>
        </li>
        <li>
          <Link href="">
            <i className="bx bx-message-square-dots"></i>M Debit
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
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
