import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";

const Home = () => {
    const values = [5, 10, 20, 50, 100];

    const [amount, setAmountValues] = useState([]);
    const [posts, setPosts] = useState([]);

    const totalDpt = () => {
        let storedAmt = JSON.parse(localStorage.getItem("deposits"));
        return storedAmt;
    };
    const [storedAmt] = useState(totalDpt);
    const totalCoins = storedAmt.reduce((acc, val) => acc + Number(val), 0);

    const { id } = "";

    const handlePost = async (post) => {
        // e.preventDefault();
        try {
            await PostService.buyProduct(
                id,
                post.productName,
                post.productPrice
            ).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

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

    const handleChange = async (event) => {
        // event.preventDefault();

        setAmountValues([...amount, event.target.value]);
        try {
            await PostService.depositAmount(amount).then(
                (response) => {
                    console.log(response);
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
            <h3>Store Page</h3>
            <div>Amount Available : {totalCoins} Coins</div>
            <div>
                Deposit
                <button
                    onClick={() => alert(`${localStorage.getItem("deposits")}`)}
                >
                    Saved
                </button>
                <div>
                    <p>Selected denominations : {amount.join(", ")}</p>
                    {values.map((value) => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                value={value}
                                onChange={handleChange}
                            />
                            {value}
                        </label>
                    ))}

                    <button
                        onClick={() =>
                            localStorage.setItem(
                                "deposits",
                                JSON.stringify(amount)
                            )
                        }
                    >
                        Deposit
                    </button>
                </div>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr style={{ fontWeight: "bold" }}>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Product ID</td>
                            <td>{""}</td>
                        </tr>
                        {posts.map((post, index) => (
                            <tr key={index}>
                                {/* <div> */}
                                <td>{post.productName}</td>
                                <td>€{post.productPrice}</td>
                                <td>{post.id}</td>
                                <button onClick={() => handlePost(post)}>
                                    Buy
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
