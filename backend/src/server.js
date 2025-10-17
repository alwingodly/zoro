import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Local run only
if (ENV.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(ENV.PORT, () => {
        console.log("Server is running on PORT:", ENV.PORT);
      });
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  };
  startServer();
} else {
  // In Vercel, DB connection must be initialized on each request
  connectDB().catch((err) => console.error("DB connection failed:", err.message));
}

export default app;

//zoro-ashy.vercel.app
