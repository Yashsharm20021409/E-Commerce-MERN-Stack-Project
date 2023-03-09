import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { Add, Remove, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../Responsive";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  /* flex 1 in imgCon and flex 1 in infoCon divide the screen in 2 parts */
  flex: 1;
`;

const Image = styled.img`
  height: 80vh;
  width: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  /* from top&bottom left&right */
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100px;
  font-size: 25px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const res = await publicRequest.get("/products/find/" + id);
      setProduct(res.data);
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } 
    else if (type === "inc") {
      setQuantity(quantity+1);
    }
  };

  const handleAddCart = ()=>{}
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color: </FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c}  onClick={()=>setColor(c)}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size: </FilterTitle>
              {/* because it is our select tag that why we use onChange method */}
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove style={{cursor:"pointer"}} onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add style={{cursor:"pointer"}} onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleAddCart}>
              <ShoppingCartOutlined
                style={{ marginRight: "3px", color: "teal" }}
              />{" "}
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
