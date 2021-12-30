import {Component} from "react";
import {CreateKey} from "../../../helperFunctions/createKey";
import {RenderTable} from "../../../helperFunctions/renderTable";

export default class TableBody extends Component {

    render() {
        const { filteredProducts, columns } = this.props;

        return(
            <tbody>
            {filteredProducts.map((product, index) => (
                <tr key={product._id}>
                    <td>{index + 1}</td>
                    {columns.map(column =>
                        <td key={CreateKey(product, column)}>
                            { RenderTable(product, column) }
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        );
    };
}
