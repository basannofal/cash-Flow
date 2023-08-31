import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MemberSidebar from "./MemberSidebar";
import MemberNavbar from "./MemberNavbar";

const MemberContainer = ({ id, children }) => {
  useEffect(() => {
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );

    sideLinks.forEach((item) => {
      const li = item.parentElement;
      item.addEventListener("click", () => {
        sideLinks.forEach((i) => {
          i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
      });
    });

    const sideBar = document.querySelector(".sidebar");
    
    
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        sideBar.classList.add("close");
      } else {
        sideBar.classList.remove("close");
      }
      if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

  
  }, []);
  return (
    <>
      <MemberSidebar id={id} />
      {/* Main Content  */}
      <div className="content">
        {/* Navbar  */}
        <MemberNavbar />

        <div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default MemberContainer;
