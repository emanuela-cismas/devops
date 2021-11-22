import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { AnimalItem } from "./AnimalItem";
import NavBar from "./NavBar";
import Slider from "./Slider";

const ContainerBase = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
  display: flex;
  position: relative;
`;

export default function Animals() 
{
  const [categoryId] = React.useState(JSON.parse(localStorage.getItem("selectedCategory")));
  const [petsData, setPetsData] = React.useState([]);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () =>
    {
      try 
      {
        if (!unmounted)
        {
          const animalsData = await axios.get(`http://localhost:3001/GetPets/${categoryId}`);
          var pets = animalsData.data;
    
          if (pets.length !== 0)
          {
            unmounted = true;
            setPetsData(pets);
          }
        }
      }
      catch (err)
      {
        if (!unmounted)
          console.log(err.response.data);
      }
    }
    fetchData();
    return () => { unmounted = true };
  }, [categoryId])

  return (
    <ContainerBase>
      <NavBar />
      <Slider />
      <Container>
        {petsData.map((item) => (
          <AnimalItem item={item} key={item.id} />
        ))}
      </Container>
    </ContainerBase>
  );
};
