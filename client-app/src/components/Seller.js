import React, { useState, useEffect } from "react";
import PostService, { API_URL } from "../services/post.service";
import axios from "axios";

/**
 * Add products as seller
 *
 * @returns add products function
 */

const NewProduct = () => {
    let id = "";
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await PostService.postPublicPosts(
                id,
                productName,
                productPrice,
                quantity
            ).then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);
                    if (productPrice === 5 || 10 || 20 || 50 || 100) {
                        return;
                    } else {
                        alert(
                            "Denominations should be values of : 5 || 10 || 20 || 50 || 100"
                        );
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <h3>Add New</h3>
                <input
                    type="text"
                    placeholder="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

/**
 *
 * View product all products as seller
 *
 */

const Seller = () => {
    const [posts, setPosts] = useState([]);

    // const [productName] = useState("");
    // const [productPrice] = useState(0);
    // const [quantity, setQuantity] = useState(0);

    // const handleEdit = async (e, id) => {
    //     e.preventDefault();
    //     try {
    //         await PostService.editProduct(
    //             productName,
    //             productPrice,
    //             quantity
    //         ).then(
    //             (response) => {
    //                 console.log(response.data);
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleUpdate = async (post) => {
        post.title = "Updated";
        await axios.put(API_URL + "/products/" + post.id);
        const postsClone = [...posts];
        const index = postsClone.indexOf(post);
        postsClone[index] = { ...post };
        setPosts(postsClone);
    };

    const handleDelete = async (post) => {
        await axios.delete(API_URL + "/products/" + post.id);
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    useEffect(() => {
        const allProducts = async () => {
            await PostService.getAllPublicPosts().then(
                (response) => {
                    console.log(response.data);
                    setPosts(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        };
        allProducts();
    }, []);

    return (
        <div>
            <h3>Seller Page</h3>
            <div>
                <NewProduct />
            </div>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        Name: {post.productName}, Price: €{post.productPrice},
                        Qty:{" "}
                        {/* <input
                            type="number"
                            placeholder="quantity"
                            value={post.quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        /> */}
                        {/* {post.quantity} */}
                        <button onClick={() => handleUpdate}>Update</button>
                        <button
                            style={{ backgroundColor: "red" }}
                            onClick={() => handleDelete(post)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Seller;
