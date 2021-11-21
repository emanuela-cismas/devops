import React from "react";
import styled from "styled-components";
import icon from "../resources/paw..png";
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { sha256 } from 'js-sha256';
import { changeLogin, changeRole, changeUserId } from '../actions/actions';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

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
// const Widget = styled.div`
//   width: 250px;
//   height: 50px;
//   display: flex;
//   font-size: 16px;
//   justify-content: flex-end;
//   padding: 0 5px 0 5px;
// `;
const Link = styled.a`
  text-align: center;
  cursor: pointer;
`;

export default function Login() 
{
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState(
      { 
        username: "",
        password: ""
      }
  );

  const handleChangeValue = (event) => 
  {
    const { name, value } = event.target;
    setLoginInfo(prevState => ({
        ...prevState,
        [name]: value
    }));
    setErrorMessage(false);
  };

  const loginUser = async(e) => 
  {
    e.preventDefault();
    if (loginInfo.username === "" || loginInfo.password === "")
    {
      setErrorMessage(true);
      return;
    }
    try 
    {
      const hashedPassword = sha256(loginInfo.password);
      const checkUserURL = `http://localhost:3001/CheckUser/${loginInfo.username}&${hashedPassword}`;
      const response = await axios.get(checkUserURL);
      var userData = response.data;

      if (userData[0] !== undefined)
      {
        dispatch(changeUserId(userData[0].id));
        dispatch(changeLogin(true));
        dispatch(changeRole(userData[0].type === 1? true:false));
        history.push("/home");
      }
      else
      {
        setErrorMessage(true);
        return;
      }
    }
    catch (err)
    {
      console.log(err.response.data);
    }
  };

  return (
    <Container>
        <center>
          <Icon>
          <form noValidate>
            <img src={icon} alt="cute paw" height="150" width="150" />
            <Title>Sign In</Title>
            <Input 
                placeholder="Username "
                id="username"
                name="username"
                required
                autoFocus
                onChange={handleChangeValue}
                value={loginInfo.username}></Input>
            <Input placeholder="Password "
                type="password"
                id="password"
                name="password"
                required
                autoFocus
                onChange={handleChangeValue}
                value={loginInfo.password}></Input>
            <br/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={loginUser}
            >Log In</Button>
          </form>
          <Link>Create an account!</Link>
          </Icon>
        </center>
        {
            <Snackbar open={errorMessage} 
                autoHideDuration={2000} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={() => { setErrorMessage(false); }}
                key={'bottom right' }>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                  Login error, <strong>wrong username or password ! </strong>
                </Alert>
              </Snackbar>
          }
      </Container>
  );
};
