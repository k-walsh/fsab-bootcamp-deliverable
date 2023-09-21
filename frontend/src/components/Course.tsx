import {
  Card,
  CardBody,
  Image,
  Divider,
  Text,
  Stack,
  Heading,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface Props {
  title: string;
  code: string;
  description: string;
  img: string;
}

const Course = ({ title, code, description, img }: Props) => {
  const [showAlert, setShowAlert] = useState(false);

  function addToCart() {
    axios
      .post("http://localhost:8080/my-courses", {
        title,
        code,
        description,
        img,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "course already added to cart") {
          setShowAlert(true);
        }
        //   console.log("course was added");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={img}
          alt={`$(title}'s course background`}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="lg">{title}</Heading>
          <Heading size="md">{code}</Heading>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="ghost" colorScheme="blue" onClick={addToCart}>
          Add to cart
        </Button>
        {showAlert && (
          <Alert status="warning">
            <AlertIcon />
            This course has already been added to your cart
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default Course;
