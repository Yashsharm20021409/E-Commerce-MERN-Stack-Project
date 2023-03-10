import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import {Wrapper,Container,Center,Left,Language,SearchContainer,Input,Logo,Right,MenuItem} from "./Style/NavbarCSS"
import {useSelector} from "react-redux"

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    
    if (type === "reg") {
      navigate("/register");
    } 
    else if (type === "login") {
      navigate("/login");
    } 
    else if (type === "logo") {
      navigate("/");
    } 
    else if (type === "cart") {
      navigate("/cart");
    }
  };

  const quantity = useSelector(state=>state.cart.quantity)

  // console.log(cart);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => handleNavigation("logo")}>E-Shop.</Logo>
        </Center>
        <Right>
          <MenuItem onClick={() => handleNavigation("reg")}>REGISTER</MenuItem>
          <MenuItem onClick={() => handleNavigation("login")}>SIGN IN</MenuItem>
          <MenuItem onClick={() => handleNavigation("cart")}>
            <Badge badgeContent={quantity} color="primary" overlap="rectangular">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
