import {Component} from "react";
import {Link} from "react-router-dom";
import DisplayTable from "./displayTable";

class HomeTable extends Component {
    render() {
        const { filteredProducts, sortColumn, onSort } = this.props;
        return(
            <DisplayTable
                filteredProducts={filteredProducts}
                sortColumn={sortColumn}
                onSort={onSort}
                columns={this.columns}
            />
        );
    }

    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },

        { key: "select", content: room => (
            <Link to={`/home/${room._id}/${room.title}`} className={"btn btn-outline-info btn-sm"}>
                Select
            </Link>
            ) }
    ];
}
export default HomeTable;