import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Pagination extends Component {
  render() {
    const { pageSize, currentPage, itemsCount, onPageChange } = this.props;
    const numberOfPages = Math.ceil(itemsCount / pageSize);
    if (numberOfPages === 1) return null;
    const pages = _.range(1, numberOfPages + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button onClick={() => onPageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
