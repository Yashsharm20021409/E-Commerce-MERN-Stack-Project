import { Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../Responsive";

const Container = styled.div`
    height: 60vh;
    display: flex;
    background-color: #fcf5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 70px;
    margin: 20px;
    ${mobile({ fontSize: "45px" })}
`
const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    /* letter-spacing: 3px; */
    ${mobile({ textAlign: "center" ,fontSize:"18px"})}
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    /* border-radius: 5px; */
    ${mobile({ width: "80%" })}
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`
const Button = styled.button`
    flex: 1.3;
    border: none;
    background-color:teal;
    color: white;
`

const NewsLetter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get Timely Updated From Your Favorite Products</Desc>
        <InputContainer>
            <Input placeholder='Your Email'/>
            <Button>
                <Send/>
            </Button>
        </InputContainer>
    </Container>
  )
}

export default NewsLetter