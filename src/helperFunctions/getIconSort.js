import React from "react";

export const GetIconSort = (column, sortColumn) => {
    if(column.path !== sortColumn.path) return null;

    if(sortColumn.order === 'asc') return <i className={"fa fa-sort-asc"}></i>

    return <i className={"fa fa-sort-desc"}></i>
};