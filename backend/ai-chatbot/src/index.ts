import { config } from "dotenv";
import express from "express";
import { connectToMongoDB } from "./connections/mongodbConnections.js";
import userRouter from "./routes/user-router.js";

config();

const app = express();

app.use(express.json);

app.use("/user", userRouter);

//app.use("/chats");

connectToMongoDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Server connected and open to Database on PORT ${process.env.PORT}`
      )
    );
  })
  .catch((err) => console.log(err));
