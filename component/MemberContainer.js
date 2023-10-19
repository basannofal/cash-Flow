import React, { createContext, useContext, useState, useEffect } from "react";
const FilterContext = createContext();
export const useFilterValue = () => useContext(FilterContext);
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MemberSidebar from "./MemberSidebar";
import MemberNavbar from "./MemberNavbar";

const MemberContainer = ({ id, children }) => {
  const [filterValue, setFilterValue] = useState(""); // State to hold the filter value
  const [filterpagenumber, setFilterpagenumber] = useState(0); // State to hold the filter value

  const handleFilterChange = (value) => {
    setFilterValue(value); // Update the filter value
  };

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
      <FilterContext.Provider value={{ filterValue, filterpagenumber }}>
        <MemberSidebar id={id} />
        {/* Main Content  */}
        <div className="content">
          {/* Navbar  */}
          <MemberNavbar />

          <div>
            <main>{children}</main>
          </div>
        </div>
      </FilterContext.Provider>
    </>
  );
};

export default MemberContainer;
