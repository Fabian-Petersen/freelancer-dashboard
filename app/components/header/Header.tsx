"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Menu,
  InputGroup,
  Input,
  Button,
  Portal,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="100%"
      px={4}
      py={3}
    >
      {/* Left section with Title */}

      <Text
        display={{ base: "none", lg: "flex" }}
        fontSize="4xl"
        fontWeight="bold"
        color={"blue.500"}
      >
        Freelancer Dashboard
      </Text>
      {/* Right section with Notifications and User Profile */}
      <Flex alignItems="center" gap={4}>
        <Box display={{ base: "none", md: "block" }}>
          <InputGroup
            width={{ base: "100%", md: "300px" }}
            maxWidth="600px"
            startElement={<SearchIcon size={20} color="black" />}
          >
            <Input placeholder="Search..." borderRadius="md" />
          </InputGroup>
        </Box>
        <IconButton
          aria-label="Search"
          variant="solid"
          colorScheme="gray"
          display={{ base: "flex", md: "none" }}
        >
          <SearchIcon size={20} />
        </IconButton>

        <IconButton
          aria-label="Notifications"
          variant="solid"
          // colorPalette="teal"
          position="relative"
          bgColor="transparent"
          color={"gray.600"}
          _hover={{
            bgColor: "gray.100",
            color: "gray.700",
          }}
        >
          <BellIcon size={20} />
          {/* Notification badge */}
          <Box
            position="absolute"
            top="-5px"
            right="-5px"
            px={"8px"}
            py={"1px"}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="gray.100"
            bg="red.500"
            borderRadius="full"
          >
            3
          </Box>
        </IconButton>

        <IconButton
          aria-label="Settings"
          variant="solid"
          bgColor="transparent"
          color={"gray.600"}
          _hover={{
            bgColor: "gray.100",
            color: "gray.700",
          }}
        >
          <SettingsIcon size={20} />
        </IconButton>

        {/* User Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button cursor="pointer" bgColor="white">
              <Avatar.Root size="md" variant="solid" bgColor="white">
                <Avatar.Fallback name="Fabian Petersen" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content w="100px" bgColor="white">
                <Flex gap={2} flexDirection="column" p={2}>
                  <Menu.Item
                    p={1}
                    value="profile-a"
                    bg={"white"}
                    color={"gray.800"}
                    letterSpacing={"0.1rem"}
                    _hover={{
                      cursor: "pointer",
                      bgColor: "gray.50/10",
                      color: "blue.500",
                    }}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    p={1}
                    bg={"white"}
                    color={"gray.800"}
                    letterSpacing={"0.1rem"}
                    value="settings-a"
                    _hover={{
                      cursor: "pointer",
                      bgColor: "gray.50/10",
                      color: "blue.500",
                    }}
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    p={1}
                    bg={"white"}
                    color={"gray.800"}
                    letterSpacing={"0.1rem"}
                    value="billing-a"
                    _hover={{
                      cursor: "pointer",
                      bgColor: "gray.50/10",
                      color: "blue.500",
                    }}
                  >
                    Billing
                  </Menu.Item>
                  <Menu.Item
                    p={1}
                    bg={"white"}
                    letterSpacing={"0.1rem"}
                    value="signout-a"
                    color="red.500"
                    _hover={{
                      cursor: "pointer",
                      bgColor: "gray.50/10",
                      color: "red.600",
                    }}
                  >
                    Sign out
                  </Menu.Item>
                </Flex>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Flex>
  );
};

export default Header;
