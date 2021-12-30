import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const DisplayTable = ({ filteredProducts, columns, onSort, sortColumn }) => {

    return(
        <table className="table table-dark">
            <TableHeader
                columns={columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />

            <TableBody
                filteredProducts={filteredProducts}
                columns={columns}
            />
        </table>
    );
};
export default DisplayTable;