import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faSignOutAlt, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { changeLogin, changeRole } from '../actions/actions';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  height: 80px;
  background-color: white;
`;
const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;
const LeftSide = styled.div`
  padding: 30px 0 0 15px;
  flex: 1;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const RightSide = styled.div`
  flex: 1;
  align-items: center;
  font-size: 20px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;
const SearchContainer = styled.div`
  border: none;
  height: 2px;
  padding: 1px;
  width: 120px;
  align-items: center;
  display: flex;
`;
const ImageContainer = styled.div`
  margin: 0 0 0 4px;
`;
const Input = styled.input`
  padding: 0 0 0 5px;
  border: none;
  width: 60px;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 27px;
`;
const LogoIcon = styled.div`
  padding: 0 5px 0 0;
`;
const MenuItem = styled.div`
  cursor: pointer;
  padding: 0 20px 0 0px;
  display: flex;
`;
const MenuIcon = styled.div`
  padding: 0 5px 0 0;
`;

export const NavBar = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged);
  const history = useHistory();
  const handleLogOut = () =>
  {
    dispatch(changeLogin(false));
    dispatch(changeRole(false));
    history.push("/login");
  };

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <SearchContainer>
            <ImageContainer>
              <FontAwesomeIcon icon={faSearch} />
              <Input />
            </ImageContainer>
          </SearchContainer>
        </LeftSide>
        <Center>
          <Logo>
            <LogoIcon>
              <FontAwesomeIcon icon={faPaw} />
            </LogoIcon>
            Get-a-Pet
          </Logo>
        </Center>
        <RightSide>
          {
          (!isLogged?
          (<React.Fragment>
            <MenuItem onClick={ () => { history.push("/register"); } }>
              <MenuIcon>
                <FontAwesomeIcon icon={faUser} />
              </MenuIcon>
              Register
            </MenuItem>
            <MenuItem onClick={ () => { history.push("/login"); } }>
              <MenuIcon>
                <FontAwesomeIcon icon={faSignInAlt} />
              </MenuIcon>
              Sign In
            </MenuItem>
          </React.Fragment>):
            <MenuItem onClick={handleLogOut}>
              <MenuIcon>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </MenuIcon>
              Sign out
            </MenuItem>
          )}
          <MenuItem>
            <MenuIcon>
              <FontAwesomeIcon icon={faClipboardCheck} />
            </MenuIcon>
            My Appointments
          </MenuItem>
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
