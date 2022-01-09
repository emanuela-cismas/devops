import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

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

export const AppointmentItem = ({ item, clearItem }) => {
  const userId = useSelector((state) => state.userId);
  const sendRejectRequest = async () =>
  {
    console.log("CLICKK");
    let res = await axios.post("http://localhost:3001/RejectAdoptPet", {petId: item.id});
    if (res.data.result !== "failed")
    {
      clearItem();
    }
    else
    {
      console.log("Request failed");
    }
  }

  const sendAcceptReq = async () =>
  {
    let res = await axios.post("http://localhost:3001/AdoptPetAccepted", { userId: userId, petId: item.id});
    if (res.data.result !== "failed")
    {
      clearItem();
    }
    else
    {
      console.log("Request failed");
    }
  }

  return (
    <Container>
      <Info>
        <Title>{item.name}</Title>
        <Title>{item.nameUser}</Title>
      </Info>
      <ButtonContainer>
        <FontAwesomeIcon icon={faX} onClick={sendRejectRequest}/>
      </ButtonContainer>
      <ButtonContainer>
        <FontAwesomeIcon icon={faCheck} onClick={sendAcceptReq}/>
      </ButtonContainer>
    </Container>
  );
};
