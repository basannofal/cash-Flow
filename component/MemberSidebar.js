import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

const MemberSidebar = ({ id }) => {
  const router = useRouter();
  const sideMenuRef = useRef(null);

  // logout code
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("is_login");
    router.push("/login");
  };

  // Get the current route pathname
  const currentPath = router.asPath;

  useEffect(() => {
    const sideLinks = sideMenuRef.current.querySelectorAll("li a");

    sideLinks.forEach((item) => {
      const linkPath = item.getAttribute("href");
      const li = item.parentElement;

      if (currentPath === linkPath) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }, [currentPath]);

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
        <li>
          <Link href={`/memberdashboard/borrows/${id}`}>
            <i class="bx bx-wallet"></i>Borrow Payment
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/borrowpayment/${id}`}>
            <i class="bx bx-credit-card-front"></i>Repay Borrow
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/payments/${id}`}>
            <i class="bx bx-credit-card-alt"></i>Fund
          </Link>
        </li>
        <li>
          <Link href={`/memberdashboard/allpayment/${id}`}>
            <i class="bx bx-money"></i>Refund
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <Link href="/memberlist">
            <i className="bx bx-home text-green-700"></i> Back To Member
          </Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout} className="logout">
            <i className="bx bx-log-out-circle"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MemberSidebar;
