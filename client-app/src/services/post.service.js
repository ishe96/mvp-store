import axios from "axios";
import authHeader from "./auth-header";

export const API_URL = "/posts";

const postPublicPosts = (id, productName, productPrice, quantity) => {
    return axios
        .post(API_URL + "/products", {
            id,
            productName,
            productPrice,
            quantity,
        })
        .then((response) => {
            return response.data;
        });
};

const getAllPublicPosts = () => {
    return axios.get(API_URL + "/products");
};

const getAllPrivatePosts = () => {
    return axios.get(API_URL + "/private", { headers: authHeader() });
};

const editProduct = (id, productName, productPrice, quantity) => {
    return axios
        .put(API_URL + `/products/${id}`, {
            id,
            productName,
            productPrice,
            quantity,
        })
        .then((response) => {
            return response.data;
        });
};

const deleteProduct = ({id}) => {
    return axios.delete(`${API_URL}/products/${id}`);
};

const postService = {
    postPublicPosts,
    getAllPublicPosts,
    getAllPrivatePosts,
    editProduct,
    deleteProduct,
};

export default postService;
