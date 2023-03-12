import { Add, Remove } from "@material-ui/icons";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import {
  Hr,Container,Wrapper,Title,Top,TopButton,TopText,TopTexts,Bottom,Info,Product,PriceDetail,ProductAmount,ProductAmountContainer,ProductColor,ProductDetail,ProductId,ProductName,ProductPrice,ProductSize,Details,Image,Summary,SummaryItem,SummaryItemPrice,SummaryItemText,SummaryTitle,Button,
} from "./Style/CartCSS";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import {userRequest} from "../requestMethods"
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Cart = () => {
  // before use dotenv first install dotenv npm
  const KEY = process.env.REACT_APP_STRIPE;
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  console.log(KEY)

  const [stripeToken,setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(()=>{
    
    const makeRequest = async ()=>{
      try{
        const res = await userRequest.post("/checkout/payment",{
          tokenId:stripeToken.id,
          amount:500,
        },);
        navigate("/success",{data:res.data})
      }catch(e){}
    }
    // if token exists and total must not be 0
    // console.log(stripeToken)
    stripeToken && cart.total >= 1 && makeRequest();
  },[stripeToken,cart.total,navigate])

  console.log(stripeToken);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.product?.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    INR {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>INR {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>INR 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>INR -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>INR {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Yash Shop"
              image="https://api.freelogodesign.org/assets/thumb/logo/6294672_400.png?t=637945524870000000"
              billingAddress
              shippingAddress
              description= {`Your Total Amout is INR ${cart.total}`}
              amount={cart.total*100}
              token={onToken}
              stripeKey= {KEY}
            >
              <Button>CheckOut</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
