"use client";

import { ColorModeButton } from "@/components/ui/color-mode";
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Menu,
  InputGroup,
  Input,
  Button,
  Portal,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import SidebarToggleButton from "../dashboard/SidebarToggleButton";

const Header = () => {
  const { isOpen, setIsOpen } = useGlobalContext();
  return (
    <Flex
      as="header"
      align="center"
      justify="end"
      w="100%"
      px={4}
      py={3}
      bgColor={{ base: "white", _dark: "#1d2739" }}
    >
      <Flex
        alignItems="center"
        gap={4}
        justifyContent="space-between"
        width={{ base: "100%" }}
        maxWidth={{ base: "100%", lg: "50%" }}
      >
        <Box display={{ base: "block", lg: "none" }}>
          <SidebarToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
        <HStack flex={1} justify="end">
          <Box display={{ base: "none", lg: "block" }} mr="auto">
            <InputGroup
              width={{ base: "100%", lg: "350px" }}
              startElement={
                <Box pl={{ lg: "0.8rem" }} bgColor="transparent">
                  <SearchIcon size={20} />
                </Box>
              }
            >
              <Input
                placeholder="Search..."
                borderRadius="md"
                borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
                color={{ base: "gray.700", _dark: "gray.50/60" }}
                _placeholder={{ color: "inherit" }}
              />
            </InputGroup>
          </Box>
          <IconButton
            aria-label="Search"
            variant="solid"
            bgColor="transparent"
            color={{ base: "gray.600", _dark: "blue.200" }}
            _hover={{
              bgColor: { base: "gray.200/70", _dark: "gray.500/40" },
            }}
            display={{ base: "flex", md: "none" }}
          >
            <SearchIcon size={20} />
          </IconButton>
          <Box
            bg="transparent"
            color={{ base: "yellow.500", _dark: "blue.200" }}
            _hover={{
              bgColor: { base: "transparent", _dark: "transparent" },
            }}
          >
            <ColorModeButton
              color={{ base: "yellow.500", _dark: "blue.200" }}
              _hover={{
                bgColor: { base: "gray.200/70", _dark: "gray.500/40" },
              }}
            />
          </Box>
          <IconButton
            aria-label="Notifications"
            position="relative"
            variant="solid"
            bgColor="transparent"
            color={{ base: "gray.600", _dark: "blue.200" }}
            _hover={{
              bgColor: { base: "gray.200/70", _dark: "gray.500/40" },
            }}
          >
            <BellIcon size={20} />
            {/* Notification badge */}
            <Flex
              position="absolute"
              align={"center"}
              justify={"center"}
              top="-5px"
              right="-5px"
              px={"7px"}
              py={"0.8px"}
              fontSize={{ base: "10px", lg: "11px" }}
              fontWeight="bold"
              color="gray.100"
              bg="red.500"
              rounded="full"
            >
              <Text>3</Text>
            </Flex>
          </IconButton>

          <IconButton
            aria-label="Settings"
            variant="solid"
            bgColor="transparent"
            color={{ base: "gray.600", _dark: "blue.200" }}
            _hover={{
              bgColor: { base: "gray.200/70", _dark: "gray.500/40" },
            }}
          >
            <SettingsIcon size={20} />
          </IconButton>

          {/* User Menu */}
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button cursor="pointer" bgColor="transparent">
                <Avatar.Root
                  size="md"
                  variant="solid"
                  bgColor={{ base: "blue.600", _dark: "white" }}
                >
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
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
