import http from "./httpService";
import config from "../config/config.json";

export function signUp(user) {
    return http.post(config.userPath, {
        email: user.email,
        name: user.name,
        password: user.password
    });
};