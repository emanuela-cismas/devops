import styled from 'styled-components';
import React from 'react';
import { categoriesData } from '../data.js';
import { AppointmentItem } from './AppointmentItem';
import NavBar from './NavBar';
import Slider from './Slider';
const BaseContainer = styled.div`
  overflow: hidden;
`;
const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
`;
export default function Appointments() {
  return (
    <BaseContainer>
      <NavBar />
      <Slider />
      <Container>
        {categoriesData.map((item) => (
          <AppointmentItem item={item} key={item.id} />
        ))}
      </Container>
    </BaseContainer>
  );
}
