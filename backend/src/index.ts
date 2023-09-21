import express from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");
import axios from "axios";

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// ====================================================================
// Routes
// ====================================================================

// route handler that returns a list of all courses offerred
app.get("/all-courses", async (req, res) => {
  const allCourses = db.collection("all-courses");
  const result = await allCourses.find({}).toArray();
  console.log("got all courses");
  return res.json(result);
});

// route handler that adds a course to the list of all courses offerred
app.post("/all-courses", async (req, res) => {
  const courseData = req.body;
  const allCourses = db.collection("all-courses");
  const course = {
    title: courseData.title,
    code: courseData.code,
    description: courseData.description,
    img: courseData.img,
  };

  try {
    await allCourses.insertOne(course);
    return res.json(course);
  } catch (e) {
    return res.status(500).send();
  }
});

// route handler that returns a list of all courses in cart
app.get("/my-courses", async (req, res) => {
  const myCourses = db.collection("my-courses");
  const result = await myCourses.find({}).toArray();
  return res.json(result);
});

// route handler that adds a new course to cart
app.post("/my-courses", async (req, res) => {
  const courseData = req.body;
  const myCourses = db.collection("my-courses");
  const course = {
    title: courseData.title,
    code: courseData.code,
    description: courseData.description,
    img: courseData.img,
  };

  const findCourse = await myCourses.find({ code: courseData.code }).toArray();

  if (findCourse.length === 0) {
    try {
      await myCourses.insertOne(course);
      return res.json(course);
    } catch (e) {
      return res.status(500).send();
    }
  } else {
    return res.send("course already added to cart");
  }
});

// route handler that deletes the course from cart
app.delete("/my-courses/:courseCode", async (req, res) => {
  const myCourses = db.collection("my-courses");
  const courseCode = req.params.courseCode;

  console.log("in backend, attempting to delete", courseCode);
  try {
    const result = await myCourses.deleteOne({ code: courseCode });
    console.log("result", result);
    return res.json(result);
  } catch (e) {
    console.log("error", e);
    return res.status(404).send(`no course found with id ${courseCode}`);
  }
});

// route handler that deletes all the courses from cart (clear cart)
app.delete("/my-courses", async (req, res) => {
  const myCourses = db.collection("my-courses");
  console.log("deleting courses");
  try {
    const result = await myCourses.deleteMany({});
    console.log("all courses deleted");
    return res.json(result);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// Start the Express server.
function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();
