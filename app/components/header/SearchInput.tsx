import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => (
  <InputGroup
    maxWidth="500px"
    width="350px"
    fontSize="20px"
    endElement={<Kbd>⌘K</Kbd>}
    startElement={<LuSearch />}
  >
    <Input fontSize="1rem" placeholder="Search..." />
  </InputGroup>
);

export default SearchInput;
