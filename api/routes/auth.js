const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../database");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

// Sign up
router.post(
    "/signup",
    [
        check("username", "Invalid username").isEmail(),
        check("password", "Password must be at least 6 chars long").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const { username, password, role } = req.body;

        // Validate user input
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        // Validate if user already exists
        let user = users.find((user) => {
            return user.username === username;
        });

        if (user) {
            // 422 Unprocessable Entity: server understands the content type of the request entity
            // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
            return res.status(200).json({
                errors: [
                    {
                        username: user.username,
                        msg: "The user already exists",
                    },
                ],
            });
        }

        // Hash password before saving to database
        const salt = await bcrypt.genSalt(10);
        console.log("salt:", salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hashed password:", hashedPassword);

        // Do not include sensitive information in JWT
        const accessToken = await JWT.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10m",
            }
        );

        // Save username and password to database/array
        users.push({
            username,
            password,
            role,
        });

        res.json({
            username,
            password,
            role,
        });
    }
);

// Get all users
router.get("/users", (req, res) => {
    res.json(users);
});

// Log in
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Look for user username in the database
    let user = users.find((user) => {
        return user.username === username;
    });

    // If user not found, send error message
    if (!user) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Invalid credentials",
                },
            ],
        });
    }

    // Compare hased password with user password to see if they are valid
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            errors: [
                {
                    msg: "username or password is invalid",
                },
            ],
        });
    }

    // Send JWT access token
    const accessToken = await JWT.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10m",
        }
    );

    // Refresh token
    const refreshToken = await JWT.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "5m",
        }
    );

    // Set refersh token in refreshTokens array
    refreshToken.push(refreshToken);

    res.json({
        accessToken,
        refreshToken,
    });
});

// Deauthenticate - log out
// Delete refresh token
router.delete("/logout", (req, res) => {
    const refreshToken = req.header("x-auth-token");

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
})

module.exports = router;
