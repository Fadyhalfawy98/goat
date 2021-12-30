import http from "./httpService";
import config from "../config/config.json";

export function getProducts() {
    return http.get(config.productPath);

};
export function getProduct(productId) {
    return http.get(config.productPath + "/" + productId);
};

export function saveProduct(product) {
    if (product._id){
        const body = { ...product };
        delete body._id;
        return http.put(config.productPath + "/" + product._id, body);
    }

    return http.post(config.productPath, product);
};

export function deleteProduct(productId) {
    return http.delete(config.productPath + "/" + productId);
};