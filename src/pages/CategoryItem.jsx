import React from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  border: teal solid 10px;
  border-radius: 15px;
  display: flex;
  text-align: center;
  background-color: teal;
  margin-right: 30px;
`;
const Image = styled.img`
  border: teal solid 10px;
  border-radius: 80px;
  height: 350px;
  width: 300px;
  background-color: white;
`;
const Info = styled.div`
  text-align: centre;
`;
const Title = styled.h1`
  background-color: white;
  width: auto;
  border-radius: 70px;
  cursor: pointer;
`;

export const CategoryItem = ({ item }) => {
  const history = useHistory();
  const goToCategory = (categoryId) =>
  {
    console.log("Accessed category");
    localStorage.setItem("selectedCategory", JSON.stringify(categoryId));
    history.push(`/animals/${categoryId}`);
  }

  return (
    <Container onClick={() => goToCategory(item.id)} >
      <Info>
        <Image src={item.url}/>
          <Title>{item.species}</Title>
      </Info>
    </Container>
  );
};
