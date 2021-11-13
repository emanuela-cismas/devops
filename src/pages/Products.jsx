import React from "react";
import styled from "styled-components";
import { animals } from "../data";
import { ProductItem } from "./ProductItem";
const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
  display: flex;
  position: relative;
`;
export const Products = () => {
  return (
    <Container>
      {animals.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  );
};
