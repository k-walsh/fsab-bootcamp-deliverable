import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import MyCourse from "@/components/MyCourse";

function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  function getMyCourses() {
    setLoading(true);

    axios
      .get("http://localhost:8080/my-courses")
      .then(function (response) {
        // handle success
        // onClose();
        // window.location.reload();
        setMyCourses(response.data);
        console.log("got my courses");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setLoading(false);
      });
  }

  function clearCart() {
    console.log("in clear cart");
    axios
      .delete("http://localhost:8080/my-courses")
      .then(function (response) {
        // handle success
        console.log("cart cleared");
        setDeleted(!deleted);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getMyCourses();
  }, [isOpen, deleted]);

  return (
    <>
      <Button onClick={() => onOpen()} key={"cart"} m={4}>
        Cart
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            My Cart{" "}
            <Button onClick={clearCart} marginLeft={"50px"}>
              Clear Cart
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <VStack width="100%">
              {myCourses.length === 0 ? (
                <p>No courses!</p>
              ) : !loading ? (
                myCourses.map((course) => (
                  <MyCourse
                    title={course.title}
                    code={course.code}
                    description={course.description}
                    img={course.img}
                    deleted={deleted}
                    setDeleted={setDeleted}
                  />
                ))
              ) : (
                <p>Courses are loading!</p>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
