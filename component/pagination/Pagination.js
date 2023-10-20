import React from "react";

const Pagination = ({ currentPage, numberOfPages, handlePageChange }) => {
  const pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);

  return (
    <div className="pagination">
      <button
        disabled={currentPage < 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {pageIndex
        .slice(
          Math.max(0, currentPage - 2),
          Math.min(numberOfPages, currentPage + 3)
        )
        .map((page) => (
          <button
            className="p-5"
            key={page}
            onClick={() => handlePageChange(page - 1)}
          >
            {page}
          </button>
        ))}
      <button
        disabled={currentPage >= numberOfPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
