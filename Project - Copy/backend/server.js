const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { ObjectId } = require("mongodb");


const url = "mongodb://localhost:27017";
const dbName = "users";
const collectionName = "users";
const client = new MongoClient(url);
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());

const connection = async () => {
  const connect = await client.connect();
  return await connect.db(dbName);
};

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ success: false, message: "No token" });
  }

  jwt.verify(token, "Google", (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    req.decoded = decoded;
    next();
  });
}


// User Routes
app.get("/users", verifyToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);

  const user = await collection.findOne(
    { _id: new ObjectId(req.decoded.userId) },
    { projection: { password: 0 } }
  );

  if (!user) {
    return res.status(404).send({ success: false });
  }

  res.send({
    success: true,
    result: {
      fullName: user.fullName,
      email: user.email
    }
  });
});


app.post("/add", async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const data = req.body;
  const emailExists = await collection.findOne({ email: data.email });
  if (emailExists) {
    return res.status(400).send({ success: false, message: "Email already exists" });
  } else if (data && data.fullName && data.email && data.password) {
    const result = await collection.insertOne(data);
    res.status(201).send({ success: true, result });
  } else {
    res.status(400).send({ success: false, message: "Required all fields" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = await connection();
  const collection = db.collection(collectionName);

  const user = await collection.findOne({ email, password });

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "Invalid email or password"
    });
  }

  const tokenData = {
    userId: user._id,
    fullName: user.fullName,
    email: user.email
  };

  jwt.sign(tokenData, "Google", { expiresIn: "2d" }, (err, token) => {
    if (err) {
      res.status(500).send({ success: false });
    } else {
      res.status(200).send({
        success: true,
        token,
        user: {
          fullName: user.fullName,
          email: user.email
        }
      });
    }
  });
});


app.listen(3200);