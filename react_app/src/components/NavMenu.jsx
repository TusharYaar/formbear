import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";

import { useAuth } from "../context/AuthContext";

import { RiArrowDownSFill } from "react-icons/ri";

const NavMenu = () => {
  const {
    currentUser: { user },
    logOut,
  } = useAuth();
  return (
    <Menu>
      <MenuButton as={Button} variant="link" rightIcon={<RiArrowDownSFill color="black" size={20} />}>
        <Avatar name={user.name} src={user.photoURL} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuDivider />
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
