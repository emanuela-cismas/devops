import React, { useEffect } from "react";
import styled from "styled-components";
import icon from "../resources/paw..png";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { sha256 } from "js-sha256";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";

const Container = styled.div`
  overflow: scroll;
`;
const Icon = styled.div`
  width: 400px;
  height: 1100px;
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

export default function Register() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    name: "",
    surname: "",
    country: "",
    city: "",
    phone: "0",
    email: "",
    hashedPassword: "",
  });

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(false);
  };

  useEffect(() => {
    const hashPassword = () => {
      const hashedPassword = sha256(userData.password);
      setUserData((prevState) => ({
        ...prevState,
        hashedPassword: hashedPassword,
      }));
      console.log(userData.hashedPassword);
    };
    if (userData) hashPassword();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.password]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    // check for empty data
    if (
      userData.username === "" ||
      userData.password === "" ||
      userData.confirm_password === "" ||
      userData.name === "" ||
      userData.surname === "" ||
      userData.country === "" ||
      userData.city === "" ||
      userData.phone === "" ||
      userData.email === "" ||
      userData.password !== userData.confirm_password
    ) {
      setErrorMessage(true);
      return;
    }

    // check if username is in use
    const usernameInUse = async (username) => {
      const checkUserURL = `http://localhost:3001/CheckUser/${username}`;
      const response = await axios.get(checkUserURL);
      var userData = response.data;
      return userData[0] !== undefined;
    };

    const result = await usernameInUse(userData.username);
    if (result) {
      setErrorMessage(true);
      return;
    }

    let mailData = {
      email: userData.email,
      subject: "Notification for registration",
      message: "",
    };
    mailData.message =
      "Hello, " +
      userData.name +
      " thank you for registering at Adopt Don't Shop." +
      "</br> Use the following password to log in : " +
      userData.password;

    let res = await axios.post("http://localhost:3001/AddUser", userData);
    if (res.data.result === "failed") {
      setErrorMessage(true);
    }

    let resMail = await axios.post("http://localhost:3001/SendMail", mailData);
    if (!resMail) {
      setErrorMessage(true);
    } else {
      setSuccess(true);
      setTimeout(() => {
        history.push("/login");
      }, 500);
    }
  };

  return (
    <Container>
      <center>
        <Icon>
          <form noValidate>
            <img src={icon} alt="cute paw" height="150" width="150" />
            <Title>Create an account</Title>
            <Input
              placeholder="Name "
              id="name"
              name="name"
              required
              type="text"
              onChange={handleChangeValue}
              value={userData.name}
            ></Input>
            <Input
              placeholder="Surname "
              id="surname"
              name="surname"
              required
              autoFocus
              type="text"
              onChange={handleChangeValue}
              value={userData.surname}
            ></Input>
            <Input
              placeholder="City "
              id="city"
              name="city"
              required
              autoFocus
              type="text"
              onChange={handleChangeValue}
              value={userData.city}
            ></Input>
            <Input
              placeholder="Country "
              id="country"
              name="country"
              required
              autoFocus
              type="text"
              onChange={handleChangeValue}
              value={userData.country}
            ></Input>
            <Input
              placeholder="Phone number "
              id="phone"
              name="phone"
              required
              autoFocus
              type="tel"
              onChange={handleChangeValue}
              value={userData.phone}
            ></Input>
            <Input
              placeholder="email@example.com"
              id="email"
              name="email"
              required
              autoFocus
              type="email"
              onChange={handleChangeValue}
              value={userData.email}
            ></Input>
            <Input
              placeholder="Username "
              id="username"
              name="username"
              required
              autoFocus
              type="text"
              onChange={handleChangeValue}
              value={userData.username}
            ></Input>
            <Input
              placeholder="Password "
              id="password"
              name="password"
              required
              autoFocus
              type="password"
              onChange={handleChangeValue}
              value={userData.password}
            ></Input>
            <Input
              placeholder="Confirm password "
              id="confirm_password"
              name="confirm_password"
              required
              autoFocus
              type="password"
              onChange={handleChangeValue}
              value={userData.confirm_password}
            ></Input>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateAccount}
            >
              Create an account
            </Button>
          </form>
        </Icon>
      </center>
      {
        <Snackbar
          open={errorMessage}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => {
            setErrorMessage(false);
          }}
          key={"bottom right"}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Registration error,{" "}
            <strong>
              empty fiels, password don't match or username already in use !{" "}
            </strong>
          </Alert>
        </Snackbar>
      }
      {
        <Snackbar
          open={success}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => {
            setSuccess(false);
          }}
          key={"bottom left"}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Request sent with success, please check your email !!
          </Alert>
        </Snackbar>
      }
    </Container>
  );
}
