import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage <= 0}
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage + 1 ? "active" : ""
          }`}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage >= totalPages - 1}
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
