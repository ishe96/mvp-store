import axios from "axios";

export const API_URL = "/posts";

/**
 *  Endpoints for : 
 *  - /products >> available to Buyer with CRUD ops:- /GET, & Seller with CRUD ops:- /GET /POST /PUT and /DELETE
 *  - /buy >> available to Buyer with CRUD ops:- /POST and /GET
 *  - /deposit >> available to Buyer with CRUD ops:- /POST and /GET
 */

// Get all public products
const getAllPublicPosts = () => {
    return axios.get(API_URL + "/products");
};

// Post products to publics
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

// Get pro
// const getAllPrivatePosts = () => {
//     return axios.get(API_URL + "/private", { headers: authHeader() });
// };

// Update products information
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

// Delete product from list
const deleteProduct = ({ id }) => {
    return axios.delete(`${API_URL}/products/${id}`);
};

// Make coin deposits
const depositAmount = (amount) => {
    return axios
        .post(API_URL + "/deposit", {
            amount,
        })
        .then((response) => {
            return response.data;
        });
};

/**
 *  Buy products - if you're buyer
 */
const buyProduct = (id, productName, productPrice, quantity) => {
    return axios
        .post(API_URL + "/buy", {
            id,
            productName,
            productPrice,
        })
        .then((response) => {
            return response.data;
        });
};

const getAllCartProducts = () => {
    return axios.get(API_URL + "/buy");
};

const postService = {
    postPublicPosts,
    getAllPublicPosts,
    editProduct,
    deleteProduct,
    depositAmount,
    getAllCartProducts,
    buyProduct,
};

export default postService;
