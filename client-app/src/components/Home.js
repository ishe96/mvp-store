import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";

const Home = () => {
    const [posts, setPosts] = useState([]);

    // const [productName, setProductName] = useState("");
    // const [productPrice, setProductPrice] = useState(0);
    // const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        PostService.getAllPublicPosts().then(
            (response) => {
                setPosts(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <div>
            <h3>Store Page</h3>
            <div>{/* <NewProduct /> */}</div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Product ID</td>
                            <td>{""}</td>
                        </tr>
                        {/* <tr> */}
                        {posts.map((post, index) => (
                            <tr key={index}>
                                {/* <div> */}
                                    <td>{post.productName}</td>
                                    <td>€{post.productPrice}</td>
                                    <td>{post.id}</td>
                                    <button
                                    //  onClick={()=>handleUpdate}
                                    onClick={()=>alert(`You selected ${post.productName}`)}
                                    >
                                        Buy
                                    </button>
                                {/* </div> */}
                            </tr>
                        ))}
                        {/* </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
