import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => (
  <InputGroup
    borderRadius="50%"
    startElement={<LuSearch fontSize={"50px"} />}
    endElement={<Kbd>⌘K</Kbd>}
  >
    <Input placeholder="Search contacts" />
  </InputGroup>
);

export default SearchInput;
