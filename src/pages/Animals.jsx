import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { AnimalItem } from "./AnimalItem";
import NavBar from "./NavBar";
import Slider from "./Slider";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  const [sortState, setSortState] = React.useState(false);

  const handleChangeSort = (e) =>
  {
    if (!sortState)
      petsData.sort((a,b) => a.age - b.age);

    setSortState(!sortState);
  }

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
            if (sortState)
            {
              pets.sort((a,b) => a.age - b.age);
            }  
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
  }, [categoryId, sortState])

  return (
    <ContainerBase>
      <NavBar />
      <Slider />
      <FormControlLabel style={{ marginTop: '90px', paddingLeft: '30px' } }
        control={<Checkbox checked={sortState} onChange={handleChangeSort}/>} 
        label="Sort animals ascending by age"  />
      <Container>
        {petsData.map((item) => (
          <AnimalItem item={item} key={item.id} />
        ))}
      </Container>
    </ContainerBase>
  );
};
