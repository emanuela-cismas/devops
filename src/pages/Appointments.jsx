import styled from 'styled-components';
import React, { useEffect } from 'react';
import axios from 'axios';
import { AppointmentItem } from './AppointmentItem';
import NavBar from './NavBar';
import Slider from './Slider';
import MyPets from './MyPets';
import { useSelector } from 'react-redux';

const BaseContainer = styled.div`
  overflow: hidden;
`;
const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
`;

export default function Appointments() {
  const [petsData, setPetsData] = React.useState([]);
  const isAdmin = useSelector((state) => state.isAdmin);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      try {
        if (!unmounted) {
          var pets;
          if (isAdmin)
          {
            const animalsData = await axios.get(
              `http://localhost:3001/GetPendingAdoptions`
            );
            pets = animalsData.data;
          }
          else
          {
            const animalsData = await axios.get(
              `http://localhost:3001/GetUserPets/${userId}`
            );
            pets = animalsData.data;
          }
          if (pets.length !== 0) {
            unmounted = true;
            setPetsData(pets);
          }
        }
      } catch (err) {
        if (!unmounted) 
          console.log(err.response.data);
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [isAdmin, userId]);

  return (
    <BaseContainer>
      <NavBar />
      <Slider />
      <Container>
      { 
        isAdmin?
          petsData.map((item) => (
          <AppointmentItem item={item} key={item.id} clearItem={ ()=> {
            const newList = petsData.filter((it) => it.id !== item.id);
            setPetsData(newList);
          }} />
        ))
        : 
        petsData.map((item) => (
          <MyPets item={item} key={item.id}/>
        ))
      }
      </Container>
    </BaseContainer>
  );
}
