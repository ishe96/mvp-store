const router = require("express").Router();
const {
    publicPosts,
    privatePosts,
    deposits,
    buyingPost,
} = require("../database");

router.post("/products", async (req, res) => {
    const { id, productName, productPrice, quantity } = req.body;

    const newPost = {
        id: `${productName}${publicPosts.length + 1}`,
        productName,
        productPrice,
        quantity,
    };
    publicPosts.push(newPost);
    res.json(publicPosts);
});

router.put("/products/:id", async (req, res) => {
    const product = publicPosts.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.id = req.body.id;
    product.productName = req.body.productName;
    product.productPrice = req.body.productPrice;
    product.quantity = req.body.quantity;

    res.json(product);
});

router.get("/products", (req, res) => {
    res.json(publicPosts);
});

// Get deposited amount - Buyer role
router.get("/deposit", (req, res) => {
    res.json(deposits);
});

// Deposit amount
router.post("/deposit", (req, res) => {
    const { amount } = req.body;

    const newPost = [
        {
            amount,
        },
    ];

    deposits.push(newPost);
    res.json(deposits);
});

// Get bought products
router.get("/buy", (req, res) => {
    res.json(buyingPost);
});

// Buy products
router.post("/buy", (req, res) => {
    const { id, sellerID, productName, productPrice, buyQuantity } = req.body;

    const newPost = {
        id: `${buyingPost.length + 1}`,
        sellerID,
        productName,
        productPrice,
        buyQuantity,
    };

    buyingPost.push(newPost);
    res.json(buyingPost);
});

// Remove a product from the vending machine
router.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productIndex = publicPosts.findIndex((p) => p.id == id);
    if (productIndex === -1) {
        res.status(404).json({ message: "Product not found" });
    } else {
        publicPosts.splice(productIndex, 1);
        res.json({ message: "Product successfully removed" });
    }
});
module.exports = router;