// Create Express Application
import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/userapi.js";
import cookieParser from "cookie-parser";
import { productApp } from "./APIs/productapi.js";
import {config} from "dotenv";
config(); // process 
const app = exp();
// Add Body Parser
app.use(exp.json());
// add cookie parser middleware

app.use(cookieParser())
app.use("/product-api",productApp)
const port = process.env.PORT||4000
// Forward Req to userApp if path starts with /user-api
app.use("/user-api", userApp);
// connect to DB Server
async function connectDB() {
    try {
        await connect(process.env.DB_URL);
        console.log("DB connection success");
        // Start Server
        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });

    } catch (err) {
        console.log("DB connection error:", err);
    }
}

connectDB();
// we can use the below which creating any API creating 
// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.name)
    // Validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Error Occurred", error: err.message })
    }
    // CastError
    if (err.name === 'CastError') {
        return res.status(400).json({ message: "Error Occurred", error: err.message })
    }
    // Custom  Errors
    // Send server side error
    res.status(500).json({ message: "Error Occurred ", error: err.message })
});

// error handling checking must be done once the server gets connected.
