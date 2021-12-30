import {Component} from "react";
import auth from "../../../services/authService";
import Like from "../../common/like";
import DisplayTable from "./displayTable";
import {Link} from "react-router-dom";

class ProductTable extends Component {
    constructor(props) {
        super(props);
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    }

    render() {
        const { filteredProducts, onSort, sortColumn } = this.props;

        return(
            <DisplayTable
                filteredProducts={filteredProducts}
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }

    columns = [
        { path: "name", label: "Name", content: product => (
                <Link to={`/products/${product._id}/${product.name}`}>
                    {product.name}
                </Link>
            ) },
        { path: "genre.name", label: "Genre" },
        { key: "liked",
            content: product => (
                <Like
                    onLike={ this.props.handleLike }
                    product={ product }
                />
            )
        }
    ];

    deleteColumn = {
        key: "delete",
        content: product => (
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => this.props.onDelete(product)}
            >
                Delete
            </button>
        )
    };

}
export default ProductTable;