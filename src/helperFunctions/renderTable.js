import _ from "lodash";

export const RenderTable = (product, column) => {
    if(column.content) return column.content(product);
    return _.get(product, column.path);
};