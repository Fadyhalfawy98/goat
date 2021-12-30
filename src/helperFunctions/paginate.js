import _ from "lodash";

export let paginate = (products, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return _(products)
        .slice(startIndex)
        .take(pageSize)
        .value();
};