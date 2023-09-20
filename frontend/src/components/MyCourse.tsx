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
}

const MyCourse = ({ title, code, description, img }: Props) => {
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
    </Card>
  );
};

export default MyCourse;
