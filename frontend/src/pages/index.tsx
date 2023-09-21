import {
  Button,
  Container,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Course from "@/components/Course";
import Cart from "./cart";

// import addAllCourses from "@/other/AddCourses";
// addAllCourses();

export default function Home() {
  const [allCourses, setAllCourses] = useState([]);
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

  function clearCart() {
    console.log("in clear cart");
    axios
      .delete("http://localhost:8080/my-courses")
      .then(function (response) {
        // handle success
        console.log("cart cleared");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  // on first render only, set the all courses
  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div>
      <Container maxW="container.lg">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            All Courses
          </Text>
          <Spacer />
          <Cart />
          <Button onClick={clearCart}>Clear Cart</Button>
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
