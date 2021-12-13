import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { displayMovieModel } from "../models/displayMovieModel";
import { movieImdbData } from "../models/movieExtraData";

 export function MovieDetails(props:displayMovieModel) {
    const [model, setModel] = useState(props);
  
    const handleClose = () => setModel({...model,show:false});
    const handleShow = () => setModel({...model,show:true});
  
    return (
      <>
        <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 