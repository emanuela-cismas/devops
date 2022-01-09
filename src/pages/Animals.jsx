import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AnimalItem } from './AnimalItem';
import NavBar from './NavBar';
import Slider from './Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

const ContainerBase = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  padding: 120px 20px 20px 40px;
  width: 430px;
  display: flex;
  position: relative;
`;
const AddContainer = styled.div`
  width: 300px;
  height: 320px;
  border: 10px teal solid;
  border-radius: 80px;
  padding: 10px;
  text-align: center;
  background-color: teal;
`;

const NewPet = styled.input`
  width: auto;
  padding: 5px;
  height: 25px;
  font-size: 20px;
  color: black;
  margin-top: 20px;
  border-radius: 25px;
  border: teal solid 4px;
  text-align: center;
`;
const Button = styled.button`
  color: black;
  width: 100px;
  height: 50px;
  font-size: 20px;
  margin: 10px 0 20px 0;
  border-radius: 25px;
  border: teal solid 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;
export default function Animals() {
  const isAdmin = useSelector((state) => state.isAdmin);
  const [categoryId] = React.useState(
    JSON.parse(localStorage.getItem('selectedCategory'))
  );
  const [petsData, setPetsData] = React.useState([]);
  const [sortState, setSortState] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [petData, setPetData] = React.useState({
    petName: "",
    category: categoryId,
    preferedFood: "",
    petAge: 0,
    adoptionFee: 0
  });

  const handleChangeSort = (e) => {
    if (!sortState) petsData.sort((a, b) => a.age - b.age);

    setSortState(!sortState);
  };

  const clearAnimalFromList = (id) =>
  {
    const newList = petsData.filter((item) => item.id !== id);
    setPetsData(newList);
  }

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setPetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(false);
  };

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      try {
        if (!unmounted) {
          const animalsData = await axios.get(
            `http://localhost:3001/GetPets/${categoryId}`
          );
          var pets = animalsData.data;

          if (pets.length !== 0) {
            if (sortState) {
              pets.sort((a, b) => a.age - b.age);
            }
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
  }, [categoryId, sortState]);

  const addNewAnimal = async (e) =>
  {
    e.preventDefault();
    if (petData.petName === "" || petData.preferedFood === "" ||
      petData.adoptionFee === 0 || petData.petAge === 0)
    {
      setErrorMessage(true);
      return;
    }
    console.log(petData);
    let res = await axios.post("http://localhost:3001/AddPet", petData);
    if (res.data.result === "failed") {
      setErrorMessage(true);
    }else{
      petsData.push(petData);
      setPetData({
        petName: "",
        preferedFood: "",
        petAge: 0,
        adoptionFee: 0
      });
      setSuccess(true);
    }
  };

  return (
    <ContainerBase>
      <NavBar />
      <Slider />
      <FormControlLabel
        style={{ marginTop: '90px', paddingLeft: '30px' }}
        control={<Checkbox checked={sortState} onChange={handleChangeSort} />}
        label="Sort animals ascending by age"
      />
      {isAdmin?
      <form noValidate>
      <AddContainer>
        <NewPet placeholder="Pet name" id="petName"
          name="petName"
          required type="text"
          onChange={handleChangeValue}
          value={petData.petName}></NewPet>
        <NewPet placeholder="Prefered food" id="preferedFood" 
          name="preferedFood"
          required type="text"
          onChange={handleChangeValue}
          value={petData.preferedFood}></NewPet>
        <NewPet placeholder="Age" id="petAge" 
          name="petAge"
          required type="text"
          onChange={handleChangeValue}
          value={petData.petAge}></NewPet>
        <NewPet placeholder="Adoption fee" id="adoptionFee" 
          name="adoptionFee"
          required type="text"
          onChange={handleChangeValue}
          value={petData.adoptionFee}></NewPet>
        <Button type="submit" onClick={addNewAnimal}>Add</Button>
      </AddContainer>
      </form>
      : ""}
      <Container>
        {petsData.map((item) => (
          <AnimalItem item={item} key={item.id} clearAnimalFromList={ () => clearAnimalFromList(item.id)}/>
        ))}
      </Container>
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
            Pet adding error,{" "}
            <strong>
              empty fiels !{" "}
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
             Pet added with success !
          </Alert>
        </Snackbar>
      }
    </ContainerBase>
  );
}
