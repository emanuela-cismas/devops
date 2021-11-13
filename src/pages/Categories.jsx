import styled from "styled-components";
import React from "react";
import { categories } from "../data.js";
import { CategoryItem } from "./CategoryItem";
const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
  display: flex;
  position: relative;
`;
export const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};
