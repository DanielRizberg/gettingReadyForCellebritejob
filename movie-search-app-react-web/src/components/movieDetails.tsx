import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { movieDetailModel } from "../models/movieDetailModel";

export function MovieDetails(props: movieDetailModel) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        fullscreen={"lg-down"}
        size={"xl"}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
   
          <div className="container-fluid" >
           
            <div className="row">
              <div className="col">
                <h6> plot:</h6>
                <p>{props.data.plot}</p>
              </div>
              <div className="col">
                <h6> cast:</h6>
                <p>
                  {props.data.cast
                    .map((x) => `${x.actor}  as :${x.character} .`)
                    .join(" \n")}
                </p>
              </div>
            </div>
            <div className="row mb-4" >
              <div className="col">
                <h5>trailer link</h5>
                <a href={props.data.trailer.link} target="_blank" rel="noreferrer" >{props.data.trailer.link}</a>
              </div>
              
            </div>
          </div>
          <img className="img-thumbnail img-fluid text-center" src={props.data.poster} alt="" style={{margin:'auto',height:'50vh'}} />
        </Modal.Body>
      
      </Modal>
    </>
  );
}
