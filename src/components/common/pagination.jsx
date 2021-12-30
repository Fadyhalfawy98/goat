import React from "react";
import _ from 'lodash';
import Link from "react-router-dom/Link";

const Pagination = ({ pageSize, length, currentPage, onPageChange }) => {

    const pagesCount = Math.ceil(length / pageSize);

    const pages = _.range(1, pagesCount + 1);

    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page =>
                 <li  className={currentPage === page ? "page-item active" : "page-item"}
                     key={page}>
                     <Link
                         className="page-link"
                         onClick={() => onPageChange(page)}
                         to="#">
                         {page}
                     </Link>
                </li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;