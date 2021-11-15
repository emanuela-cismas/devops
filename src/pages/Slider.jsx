import React from "react";
import styled from "styled-components";
import PetsImage from "../resources/animals.png";

const Container = styled.div`
  width: 100%;
  height: 500px;
  justify-content: space-between;
  background-color: teal;
  border-radius: 40px;
`;
const ContainerImage = styled.div`
  text-align: center;
  padding: 20.5px 0 0 0;
`;
const ContainerText = styled.div`
  padding: 40px 0 0 0;
  text-align: center;
  color: white;
  font-size: 45px;
`;
const ContainerText2 = styled.div`
  padding: 0px 0 0 0;
  text-align: center;
  color: white;
  font-size: 45px;
`;

export const Slider = () => {
  return (
    <Container>
      <ContainerText>Our pets can't wait to meet you</ContainerText>
      <ContainerText2>Come and get one today!</ContainerText2>
      <ContainerImage>
        <img src={PetsImage} alt="d" height="500" width="1600" />
      </ContainerImage>
    </Container>
  );
};
export default Slider;
