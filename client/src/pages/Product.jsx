import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import { Add, Remove, ShoppingCartOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import { publicRequest } from "../requestMethods";

import {Container,Wrapper,ImageContainer,Image,InfoContainer,Title,Desc,Price,Filter,FilterContainer,FilterSize,FilterColor,FilterSizeOption,FilterTitle,AddContainer,Amount,AmountContainer,Button} from './Style/Product'
import {useDispatch} from "react-redux"
import {addProduct} from '../Redux/cartRedux'


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

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

  const handleAddCart = ()=>{
    dispatch(addProduct({...product,quantity,color,size}))
  }
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
