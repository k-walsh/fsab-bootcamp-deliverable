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

interface Props {
  title: string;
  code: string;
  description: string;
  img: string;
  deleted: boolean;
  setDeleted;
}
import axios from "axios";

const MyCourse = ({
  title,
  code,
  description,
  img,
  deleted,
  setDeleted,
}: Props) => {
  function deleteCourse() {
    axios
      .delete(`http://localhost:8080/my-courses/${code}`)
      .then(function (response) {
        // handle success
        console.log("deleted", code);
        setDeleted(!deleted);
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
          <Button colorScheme="red" onClick={() => deleteCourse()}>
            remove from cart
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MyCourse;
