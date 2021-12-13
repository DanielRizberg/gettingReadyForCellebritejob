
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { movieDetailModel } from "../models/movieDetailModel";

export function MovieDetails(props: movieDetailModel) {
  

 

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} >
        <Modal.Header closeButton={true} >
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
