import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaTabDropDown = async (productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/product/"+productId+"/pgaReport")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}