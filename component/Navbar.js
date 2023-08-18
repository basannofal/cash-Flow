import React, { useState, useEffect } from "react";

const Navbar = ({ onFilterChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onFilterChange(e.target.value); // Notify parent component about filter change
    console.log(searchText);
  };

  const handleMobileSearchToggle = () => {
    const searchForm = document.querySelector("nav form");
    const searchBtnIcon = document.querySelector(
      "nav form .form-input button .bx"
    );

    if (window.innerWidth < 576) {
      searchForm.classList.toggle("show");
      searchBtnIcon.classList.toggle("bx-search");
      searchBtnIcon.classList.toggle("bx-x");
    }
  };

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <>
      {/* Navbar  */}
      <nav>
        <i className="bx bx-menu"></i>
        <form>
          <div className="form-input">
            <input
              type="search"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>

        <input
          type="checkbox"
          id="theme-toggle"
          hidden
          onChange={handleThemeToggle}
        />
        <label htmlFor="theme-toggle" className="theme-toggle"></label>
        <a href="#" className="notif">
          <i className="bx bx-bell"></i>
          <span className="count">12</span>
        </a>
        <a href="#" className="profile">
          <img src="/images/logo.png" alt="Profile" />
        </a>
      </nav>

      {/* End of Navbar  */}
    </>
  );
};

export default Navbar;
