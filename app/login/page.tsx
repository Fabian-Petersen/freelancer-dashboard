import LoginForm from "../components/login/LoginForm";
import { Box } from "@chakra-ui/react";

export default function Login() {
  return (
    <Box
      as="main"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      w="100%"
      h="100vh"
    >
      <LoginForm />
    </Box>
  );
}
