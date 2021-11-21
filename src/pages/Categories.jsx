import styled from "styled-components";
import React from "react";
import { categoriesData } from "../data.js";
import { CategoryItem } from "./CategoryItem";

const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
  display: flex;
  position: relative;
`;
export default function Categories()
{
  return (
    <Container>
      {categoriesData.map((item) => (
        <CategoryItem item={item} key={item.id}/>
      ))}
    </Container>
  );
};
