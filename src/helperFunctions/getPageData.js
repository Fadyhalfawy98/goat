import _ from "lodash";
import {paginate} from "./paginate";
import FilterProducts from "./filterProducts";

export const getPageData = (allProducts, selectedGenre, pageSize, currentPage, sortColumn, searchQuery) => {
    const productsFiltered = FilterProducts(allProducts, selectedGenre, searchQuery);

    const productsSorted = _.orderBy(productsFiltered, [sortColumn.path], [sortColumn.order]);

    const products = paginate(productsSorted, pageSize, currentPage);

    return ({ length: productsFiltered.length, filteredProducts: products });
};
