import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Heading = styled.h1`
  /* margin-bottom: px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  font-size: 50px;
  font-weight: 400;
  /* margin-left: 22px; */
`;

const Product = ({ cat, filters, sort }) => {
  // console.log(cat,sort,filters);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  // use Effect used here :- when dependecy(cat) get change run all inside function

  useEffect(() => {
    // we use axious insted of javascript fetch to call the api
    const getProducts = async () => {
      try {
        // use get req to fetch the data
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        // console.log(err)
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilterProducts(
        // filter is function of js
        // and this is how we filter products
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    // console.log(filterProducts)
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        // inside this array compare two elements
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } 
    else if (sort === "asc") {
      setFilterProducts((prev) =>
        // inside this array compare two elements
        [...prev].sort((a, b) => a.price - b.price)
      );
    } 
    else {
      setFilterProducts((prev) =>
        // inside this array compare two elements
        [...prev].sort((a, b) => b.price - a.price)
      );
    }

  }, [sort]);
  return (
    <>
      <Heading>Products</Heading>
      <Container>
        {/* fetching from api */}
        {cat
          ? filterProducts.map((item) => (
              <ProductItem item={item} key={item._id}></ProductItem>
            ))
          : products
              .slice(0, 8)
              .map((item) => (
                <ProductItem item={item} key={item._id}></ProductItem>
              ))}
      </Container>
    </>
  );
};

export default Product;
