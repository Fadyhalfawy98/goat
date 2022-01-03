import {Component} from "react";
import {Link} from "react-router-dom";
import DisplayTable from "./displayTable";

class HomeTable extends Component {
    render() {
        return(
            <DisplayTable
                filteredProducts={this.props.filteredRooms}
                sortColumn={this.props.sortColumn}
                onSort={this.props.onSort}
                columns={this.columns}
            />
        );
    }

    columns = [
        { path: "title", label: "Title", content: room => (
                <Link to={`/home/${room._id}/${room.title}`}>
                    {room.title}
                </Link>
            ) },
        { path: "genre.name", label: "Genre" }
    ];
}
export default HomeTable;