import axios from "axios";

// add courses to the all courses db (only ran once)
function addCourse(
  title: string,
  code: string,
  description: string,
  img: string
) {
  axios
    .post("http://localhost:8080/all-courses", {
      title,
      code,
      description,
      img,
    })
    .then(() => console.log("course was added"))
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function addAllCourses() {
  addCourse(
    "Computing Foundations: Data",
    "CSCI 0111",
    "An introduction to computing and programming that focuses on understanding and manipulating data.",
    "https://brown-csci0111.github.io/assets/images/ducks/cs111-duck.png"
  );

  addCourse(
    "Biotechnology in Medicine",
    "BIOL 0170",
    "Introduces undergraduates to the main technological advances currently dominating the practice of medicine.",
    "https://www.mytechmag.com/wp-content/uploads/2022/04/biotechnology-examples-types.jpg"
  );

  addCourse(
    "Introduction to Software Engineering",
    "CSCI 0320",
    "Focuses on designing, building, testing, and maintaining systems collaboratively.",
    "https://media.geeksforgeeks.org/wp-content/uploads/20230426115225/computer-image-660.jpg"
  );

  addCourse(
    "American Sign Language I, II",
    "SIGN 0100",
    "An immersive approach using authentic communication inside and outside of the classroom will be used to develop introductory communicative skills in American Sign Language.",
    "https://www.frederickinterpreting.com/wp-content/uploads/2021/04/asl.jpg"
  );

  addCourse(
    "Dreams",
    "ENGL 0300P",
    "“Why do we dream?” may be an intriguing question, but ultimately one for science to answer. In this course, we will engage with various cultural texts about dreams.",
    "https://www.grunge.com/img/gallery/things-you-cant-do-in-your-dreams-and-why/intro-1681935006.jpg"
  );

  addCourse(
    "Anthropology of Food",
    "ANTH 0680",
    "An exploration of the human experience of food and nutrition from evolutionary, archaeological, and cross-cultural perspectives.",
    "https://news.fullerton.edu/app/uploads/2020/11/Anthropology-of-Food.jpg"
  );

  addCourse(
    "Chemistry and Art",
    "CHEM 0999",
    "an interdisciplinary course that explores different chemical concepts and techniques through the lenses of art and art history.",
    "https://i.etsystatic.com/19765635/r/il/49c6ce/2985787958/il_340x270.2985787958_1u3l.jpg"
  );

  addCourse(
    "Social Psychology",
    "CLPS 0700",
    "Examines the theories, findings, and methods of social psychology.",
    "https://ananda.ai/wp-content/uploads/2021/12/vlog-44-1024x536.jpg"
  );

  addCourse(
    "Politics and Public Education",
    "EDUC 0820",
    "Who exercises power in public education? This course examines the key institutions and actors shaping American K-12 education in order to understand recent policy trends and their consequences for students.",
    "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg"
  );
}

export default addAllCourses;
