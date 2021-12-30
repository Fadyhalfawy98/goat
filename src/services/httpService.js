import Axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggerService";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (!expectedError){
        logger.log(error);
        toast.error("An unexpected error occurred..");
    }

    return Promise.reject(error);
});

function setJwt(jwt) {
    Axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    patch: Axios.patch,
    delete: Axios.delete,
    setJwt
}

export default http;