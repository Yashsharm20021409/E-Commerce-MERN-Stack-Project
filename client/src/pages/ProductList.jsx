import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Product from "../Components/Product";
import { mobile } from "../Responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterComponent = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters,setFilter] = useState({});

  const handleFilter = (e)=>{
    // e.target.value provide the value on which curson work || provide the selected value
    const value = e.target.value;
    setFilter({
      // use spread opt to store both size and color at same time
      ...filters,
      [e.target.name] : value
    })

    console.log(filters)
  }

  const [sort,setSort] = useState("newest");

  const handleSort = (e)=>{
    const sortVal = e.target.value
    setSort(sortVal)

    console.log(sort);
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterComponent>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onClick={handleFilter}>
            <Option  >
              color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Green</Option>
            <Option>Yellow</Option>
            <Option>Blue</Option>
          </Select>
          <Select name="size" onClick={handleFilter}>
            <Option  >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterComponent>
      {/* passed as a props to product page/component*/}
      <Product cat={cat} filters={filters} sort={sort}/>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;
