import styled from "styled-components"
import { mobile } from "../Responsive"



const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    text-align: center;
    align-items: center;  // for vertically
    justify-content: center; // for horizontally
    font-size: 14px;
    font-weight: 500;
    ${mobile({ fontSize:"10px",fontWeight:'500' ,margin:'0px 2px'})}
`

const Announcement = () => {
  return (
    <Container>
        Super Deal! Free Shipping on Minimum ₹500 Orders Value
    </Container>
  )
}

export default Announcement