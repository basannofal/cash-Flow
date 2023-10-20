import React, { createContext, useContext, useState, useEffect } from "react";
const FilterContext = createContext();
export const useFilterValue = () => useContext(FilterContext);
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MemberList from "./member/MemberList";

const Container = ({ children }) => {
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

    const menuBar = document.querySelector(".content nav .bx.bx-menu");
    const sideBar = document.querySelector(".sidebar");

    menuBar.addEventListener("click", () => {
      sideBar.classList.toggle("close");
    });

    const searchBtn = document.querySelector(
      ".content nav form .form-input button"
    );
    const searchBtnIcon = document.querySelector(
      ".content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector(".content nav form");

    searchBtn.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchBtnIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchBtnIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });

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

    const toggler = document.getElementById("theme-toggle");

    toggler.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });
  }, []);

  return (
    <>
      {/* <Sidebar />
      <div className="content">
        <Navbar onFilterChange={handleFilterChange} />
        <div>
          <main>
            <MemberList filterValue={filterValue} />
            {children}
          </main>
        </div>
      </div> */}
      <FilterContext.Provider value={{ filterValue, filterpagenumber }}>
        <Sidebar />
        <div className="content">
          <Navbar onFilterChange={handleFilterChange} />
          <div>
            <main>
              {/* Render children components */}
              {children}
            </main>
          </div>
        </div>
      </FilterContext.Provider>
    </>
  );
};

export default Container;
