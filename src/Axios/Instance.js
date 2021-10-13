import axios from "axios";
import { URL } from "../Actions/URL";

const customAxios = axios.create({
    baseURL : URL,
})

const requestHandler = request => {
    console.log(request, "request---------")
    let accessToken = window.sessionStorage.getItem('accessToken')
    request.headers.Authorization = `Bearer ${accessToken}`;
    request.headers.admin = 'yes';
    return request;
};

const responseHandler = response => {
    console.log(response, "response---------")
    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

 export default customAxios