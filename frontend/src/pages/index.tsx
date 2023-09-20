import {
  Button,
  Container,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NewPostModal from "@/components/NewPostModal";
// import Post from "@/components/Post";
import axios from "axios";
import Course from "@/components/Course";

// import addAllCourses from "@/other/AddCourses";
// addAllCourses();

export default function Home() {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getAllCourses() {
    setIsLoading(true);

    axios
      .get("http://localhost:8080/all-courses")
      .then(function (response) {
        // handle success
        setAllCourses(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  // on first render only, set the all courses
  useEffect(() => {
    getAllCourses();
  }, []);

  // const [newCourse, setNewCourse] = useState(false);
  // const [myCourses, setMyCourses] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getPosts();
  // }, [newPostDialog]);

  // function getPosts() {
  //   // Set isLoading to true while we make the API request.
  //   setIsLoading(true);

  //   // TODO: Make a POST request with the form data to the /posts endpoint
  //   axios
  //     .get("http://localhost:8080/posts")
  //     .then(function (response) {
  //       // handle success
  //       setPosts(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       setIsLoading(false);
  //     });
  // }

  console.log("courses", allCourses);

  return (
    <div>
      {/* <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      /> */}
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            All Courses
          </Text>
          <Spacer />
          {/* <Button onClick={() => setNewPostDialog(true)}>New</Button> */}
        </HStack>
        <VStack width="100%">
          {allCourses.length !== 0 && !isLoading ? (
            allCourses.map((course) => (
              <Course
                title={course.title}
                code={course.code}
                description={course.description}
                img={course.img}
              />
            ))
          ) : (
            <p>Courses are loading!</p>
          )}
        </VStack>
      </Container>
    </div>
  );
}
