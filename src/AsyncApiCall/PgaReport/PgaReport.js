import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaTabDropDown = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/product/4/pgaReport")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}