import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoute from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";
import { getNumberFromString, getNumberFromStringV2 } from "./src/ultils/common";

console.log(getNumberFromStringV2('900.000 nghin'));

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoute(app);
connectDatabase();

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
