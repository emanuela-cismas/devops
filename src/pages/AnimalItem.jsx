import styled from 'styled-components';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

const Container = styled.div`
  border: teal solid 10px;
  border-radius: 15px;
  text-align: center;
  background-color: teal;
  margin-right: 30px;
`;

const Info = styled.div`
  text-align: centre;
`;
const Title = styled.h1`
  background-color: white;
  width: auto;
  border-radius: 70px;
  cursor: pointer;
`;

export const AnimalItem = ({ item, clearAnimalFromList }) => {
  const [adoptForm, setAdoptForm] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const userId = useSelector((state) => state.userId);
  const handleApprove = async () =>
  {
    console.log("adopting req sent");
    let res = await axios.post("http://localhost:3001/AdoptPetPending", { userId: userId, petId: item.id });
    if (res.data.result === "failed") {
      setErrorMessage(true);
    }else{
      setAdoptForm(false);
      setSuccess(true);
      clearAnimalFromList();
    }
  }

  return (
    <Container>
      <Info>
        {/* <Image src={item.image} /> */}
        <Title>{item.name}</Title>
        <br />
        <p>Age: {item.age} months</p>
        <br />
        <p>Preferred food: {item.food_preferred}</p>
        <br />
        <p>Adoption fee: {item.adoption_fee} RON</p>
        <br />
        <button onClick={() => { setAdoptForm(true) }}>Adopt</button>
      </Info>
      <Dialog open={adoptForm} onClose={() => { setAdoptForm(false) }} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Are you sure you want to adopt {item.name} ?</DialogTitle>
        <DialogContent>
          After you click yes, your adoption will be pending until an administrator approves it.
        </DialogContent>
        <DialogActions>
        <Button onClick={() => { setAdoptForm(false) }} color="primary">
          No
        </Button>
        <Button onClick={handleApprove} color="primary">
          Yes
        </Button>
        </DialogActions>
      </Dialog>
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
            Adoption error,{" "}
            <strong>
              something went wrong in the backend req!{" "}
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
            Your adoption is now pending until an admin approves it !
          </Alert>
        </Snackbar>
      }
    </Container>
  );
};
