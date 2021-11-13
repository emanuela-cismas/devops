import React from "react";
import styled from "styled-components";
import icon from "./paw..png";
import Switch from "react-switch";
const Container = styled.div`
  overflow: hidden;
`;
const Icon = styled.div`
  width: 400px;
  height: 620px;
  border: teal solid 10px;
  border-radius: 30px;
  background-color: teal;
  margin: 15px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 10px;
  color: white;
`;
const Input = styled.input`
  width: 250px;
  height: 45px;
  font-size: 20px;
  color: black;
  margin: 20px 0 20px 0;
  border-radius: 25px;
  border: teal solid 4px;
  text-align: center;
`;
const Button = styled.button`
  color: black;
  width: 250px;
  height: 50px;
  font-size: 20px;
  margin: 10px 0 20px 0;
  border-radius: 25px;
  border: teal solid 4px;
  cursor: pointer;
`;
const Widget = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  font-size: 16px;
  justify-content: flex-end;
  padding: 0 5px 0 5px;
`;
const Link = styled.a`
  text-align: center;
  cursor: pointer;
`;

export const Register = () => {
  return (
    <Container>
      <center>
        <Icon>
          <img src={icon} height="150" width="150" />
          <Title>Sign In</Title>
          <Input placeholder="Username "></Input>
          <Input placeholder="Password  " type="password"></Input>
          <Widget>
            Are you an admin? <Switch></Switch>
          </Widget>
          <Button>Log In</Button>

          <Link>Create an account!</Link>
        </Icon>
      </center>
    </Container>
  );
};
