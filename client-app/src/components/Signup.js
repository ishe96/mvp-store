import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        var new_user = {
            id: `${username}_1`,
            name: username,
            password: password,
            role: role,
            deposit: [],
        };
        
        try {
            await AuthService.signup(username, password, role).then(
                (response) => {
                    // check if user already exists with 200
                    //   console.log("Sign up successfully", response);
                    if (role === "buyer") {
                        navigate("/home");
                    } else {
                        navigate("/seller");
                    }

                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }

        localStorage.setItem("user", JSON.stringify([new_user]));
    };

    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            try {
                localStorage.setItem("user", "[]");
            } catch (e) {
                alert("Register on the App");
            }
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSignup}>
                <h3>Sign up</h3>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
