import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 70vh;

  /* for align info at image  */
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  /* show img covered portion only */
  object-fit: cover;
  ${mobile({ height: "25vh" })}
`;
const Info = styled.div`
  /* to make text goes on to the image */
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  /* to make text at middle of image */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;
const Button = styled.button`
  border: none;
  background-color: white;
  color: gray;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
`;

const CategoriesItem = ({ item }) => {

  const navigate = useNavigate();
  const goTo = ()=>{
    navigate(`/products/${item.cat}`);
  }
  return (
    <Container>
      {/* <Link to={`/products/${item.cat}`}> */}
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button onClick={goTo}>SHOP NOW</Button>
        </Info>
      {/* </Link> */}
    </Container>
  );
};

export default CategoriesItem;
