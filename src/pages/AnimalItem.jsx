import styled from "styled-components";
import React from "react";

const Container = styled.div`
  border: teal solid 10px;
  border-radius: 15px;
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

export const AnimalItem = ({ item }) => {
  return (
    <Container>
      <Info>
        {/* <Image src={item.image} /> */}
        <Title>{item.name}</Title>
      </Info>
    </Container>
  );
};
