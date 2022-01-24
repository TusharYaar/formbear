import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  // MenuOptionGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { RiArrowDownSFill } from "react-icons/ri";

const NavMenu = () => {
  let navigate = useNavigate();

  const {
    currentUser: { user },
    logOut,
  } = useAuth();

  const handleLogout = () => {
    navigate("/", { replace: true });
    logOut();
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="link" rightIcon={<RiArrowDownSFill color="black" size={20} />}>
        <Avatar name={user.name} src={user.photoURL} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem as={RouterLink} to="/settings">
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
