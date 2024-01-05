import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";
const PORT = process.env.PORT || 5000;
//userRouter.use("/user");
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`Server connected and open to Database on PORT ${process.env.PORT}`));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map