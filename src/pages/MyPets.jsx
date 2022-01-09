import React from 'react';
import styled from 'styled-components';

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

export default function MyPets ({ item })
{
    const printStatus = (id_status) =>
    {
        return id_status === 1? "Pending":"Adopted";
    }
    return (
        <Container>
            <Info>
            <Title>{item.name}</Title>
            <Title>Status: {printStatus(item.is_adopted)}</Title>
            </Info>
        </Container>
    );
};
