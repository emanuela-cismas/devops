import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  border: teal solid 10px;
  border-radius: 15px;
  display: flex;
  text-align: center;
  background-color: teal;
  margin-right: 30px;
  margin-top: 40px;
  width: 1000px;
`;
const Info = styled.div`
  text-align: centre;
  width: 500px;
  display: flex;
`;
const Title = styled.h2`
  background-color: white;
  width: 400px;
  border-radius: 70px;
  cursor: pointer;
  height: 35px;
  margin-right: 30px;
  margin-top: 6px;
`;
const ButtonContainer = styled.div`
  width: 200px;
  font-size: 45px;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
`;
export const AppointmentItem = ({ item }) => {
  return (
    <Container>
      <Info>
        <Title>Animal Name</Title>
        <Title>Client Name </Title>
      </Info>
      <ButtonContainer>
        <FontAwesomeIcon icon={faX} />
      </ButtonContainer>
      <ButtonContainer>
        <FontAwesomeIcon icon={faCheck} />
      </ButtonContainer>
    </Container>
  );
};
