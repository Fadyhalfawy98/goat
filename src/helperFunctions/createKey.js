export const CreateKey = (product, column) => {
    return product._id + (column.path || column.key);
};