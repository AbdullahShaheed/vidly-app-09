import React, { Component } from "react";

export default class TableHeader extends Component {
  raiseSort = (path) => {
    const { sortColumn } = this.props;
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderIcon = (path) => {
    const { sortColumn } = this.props;
    if (sortColumn.path !== path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-alpha-asc"></i>;
    return <i className="fa fa-sort-alpha-desc"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderIcon(column.path)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
