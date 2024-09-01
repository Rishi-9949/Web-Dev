// Imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

import dotenv from "dotenv";
dotenv.config();

// async function testConnection() {
//   try {
//     await prisma.$connect();
//     console.log("Connected to the database successfully");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// testConnection();

const app = express();


const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.all("/", async (req, res) => {
  return res.sendStatus(500);
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ message: "An unexpected error occurred", error: err.message });
});

app.listen(8800, () => {
  console.log("Server is running!");
  console.log("works");
});
