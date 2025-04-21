import React from "react";
import { Flex, Container, Text, Box } from "@chakra-ui/react";

import { dashboardCardData } from "@/public/data/dashboardCardData";
import { TrendingDown, TrendingUp } from "lucide-react";

const CardItem = () => {
  return (
    <>
      {dashboardCardData.map((card) => (
        <Container key={card.id} position="relative" width="100%">
          <Flex
            direction="column"
            gap={{ base: "2", xl: "3" }}
            justify="space-between"
            bgColor={{ base: "white", _dark: "#1d2739" }}
            color={{ base: "gray.600", _dark: "white" }}
            padding={{ base: "0.325rem", xl: "0.5rem" }}
            borderRadius={"md"}
            shadow="md"
            borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
          >
            {/* // $ ======================== $ Card Title & Value ============== */}
            <Box>
              <Text
                textTransform={"capitalize"}
                fontSize={{ base: "0.9rem", xl: "1rem" }}
              >
                {card.title}
              </Text>
              <Text fontSize={{ base: "1.7rem", xl: "2rem" }}>
                {card.title === "total revenue" ? <Box as="span">R</Box> : null}

                {card.value}
              </Text>
            </Box>
            {/* // $ ======================== $ Card Trend Indicator ============== */}
            <Flex
              color={card.valueChange > 0 ? "green.500" : "red.500"}
              width="100%"
              fontSize={{ base: "0.625rem", xl: "0.825rem" }}
              gap={2}
              alignSelf={"end"}
              //   border="1px dashed red"
            >
              {card.valueChange > 0 ? (
                <TrendingUp color="green" size={16} />
              ) : (
                <TrendingDown color="red" size={16} />
              )}
              <Text alignSelf={"end"}>
                {card.valueChange}
                <Box as="span">% {""} from last month</Box>
              </Text>
            </Flex>
          </Flex>

          {/* // $ =========================== Card Icon ========================== */}
          <Box
            position="absolute"
            top="50%"
            translate={"-50% -50%"}
            right="-5%"
            padding={{ base: "0.625rem", xl: "0.8rem" }}
            rounded="full"
            color={card.color}
            bgColor={card.bgColor}
          >
            {React.createElement(card.icon)}
          </Box>
        </Container>
      ))}
    </>
  );
};

export default CardItem;
