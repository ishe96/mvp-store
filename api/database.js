const users = [
    {
        username: "john12",
        password: "random",
        role: "seller",
    },
    {
        username: "j@doe",
        password: "JackPassword",
        role: "buyer",
    },
];

const publicPosts = [
    {
        id: "Product1",
        productName: "Product 1",
        productPrice: 5,
        quantity: 15,
    },
    {
        id: "Product2",
        productName: "Product 2",
        productPrice: 20,
        quantity: 55,
    },
];

const deposits = [
    {
        amount: [5, 10, 50],
    },
    {
        amount: [50, 100],
    },
];

const buyingPost = [];

const privatePosts = [
    {
        id: "Product3",
        productName: "Product 3",
        productPrice: 25,
        quantity: 50,
    },
];

module.exports = { users, publicPosts, deposits, buyingPost, privatePosts };
