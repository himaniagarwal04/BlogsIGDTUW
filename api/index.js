const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
var cors = require('cors')
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/blog/upload", upload.single("file"), (req, res) => {
    return res.status(200).json("File has been uploaded");
  });
app.use(cors())
app.use("/blog/auth", authRoute);
app.use("/blog/users", userRoute);

app.use("/blog/posts", postRoute);
app.use("/blog/categories", categoryRoute);

app.listen("8800", () => {
  console.log("Backend is running.");
});
