import React from 'react'
import styled from 'styled-components'
import {popularProducts} from '../data'
import ProductItem from './ProductItem'



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

const Heading = styled.h1`
    /* margin-bottom: px; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    font-size: 50px;
    font-weight: 400;
    /* margin-left: 22px; */
`

const Product = () => {
  return (
    <>
    <Heading>Products</Heading>
    <Container>
        {popularProducts.map((item)=>(
            <ProductItem item={item} key={item.id}></ProductItem>
        ))}
    </Container>
    </>
  )
}

export default Product