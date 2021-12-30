import React from "react";
import {Component} from "react";
import Link from "react-router-dom/Link";
import auth from "../../../services/authService";
import {ListGroup} from "../../common/listGroup";
import {getGenres} from "../../../services/genreService";
import {deleteProduct, getProducts} from "../../../services/productService";
import SearchBoxForm from "./SearchBoxForm";
import ProductTable from "./productTable";
import {getPageData} from "../../../helperFunctions/getPageData";
import Pagination from "../../common/pagination";
import {toast} from "react-toastify";

class Products extends Component {
    state = {
        products: [],
        genres: [],
        searchQuery: "",
        selectedGenre: "",
        pageSize: 5,
        currentPage: 1,
        sortColumn: { path: 'name', order: 'asc' }
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [ { _id: "", name: "All Products" }, ...data ];

        const { data: products } = await getProducts();

        this.setState({ products, genres });
    }

    render() {
        const {products: allProducts, genres, selectedGenre, pageSize, currentPage, sortColumn, searchQuery} = this.state;

        const {length, filteredProducts} = getPageData(allProducts, selectedGenre, pageSize, currentPage, sortColumn, searchQuery);

        const user = auth.getCurrentUser();

        return(
            <div>
                <h1> There are { length } products in the {selectedGenre.name} database</h1>

                <div className={"row"}>

                    <div className={"col-3"}>
                        <ListGroup
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectedGenre={this.handleSelectedGenre}
                        />
                    </div>

                    <div className={"col"}>
                        <SearchBoxForm
                            value={searchQuery}
                            onChange={this.handleSearch}
                        />
                        <ProductTable
                            filteredProducts={filteredProducts}
                            onDelete={this.handleDelete}
                            handleLike={this.handleLike}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                        />
                        <Pagination
                            pageSize={pageSize}
                            length={length}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>

                { user && user.isAdmin &&
                    <React.Fragment>

                        <h1> To add a new product </h1>

                        <Link
                            to={"/products/new"}
                            className={"btn btn-outline-info"}
                            style={{marginBottom: 20}}>
                            New Product
                        </Link>

                    </React.Fragment>
                }

            </div>
        );
    }

    handleLike = product => {
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index] = {...products[index]};
        products[index].liked = !products[index].liked;
        this.setState({ products });
    };

    handleDelete = async product => {
        const { products } = this.state;
        const originalProducts = products;
        const  productsFilter = originalProducts.filter(m => m._id !== product._id);

        this.setState({ products: productsFilter });

        try { await deleteProduct(product._id); }
        catch (e) {
            if (e.response && e.response.status === 404)
                toast.error('This post has already been deleted!');

            this.setState({ products: originalProducts });
        }
    };

    handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    };

    handleSelectedGenre = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page});
    };

}

export default Products;