import React from "react";
import Categories from "./Categories";
import NavBar from "./NavBar";
import Slider from "./Slider";
import styled from "styled-components";
const Container = styled.div`
  overflow: hidden;
`;

export const Home = () => {
  return (
    <Container>
      <NavBar />
      <Slider />
      <Categories />
    </Container>
  );
};
export default Home;
