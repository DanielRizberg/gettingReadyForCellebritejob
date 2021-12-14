import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { movieDetailModel } from "../models/movieDetailModel";

export function MovieDetails(props: movieDetailModel) {
  const imdbLink = `http://www.imdb.com/video/imdb/${props.data.trailer.id}/imdb/embed?autoplay=false&width=480`;
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
          <div className="container-fluid">
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
            <div className="row mb-4">
              {props.data.trailer?.id ? (
                <div className="col">
                  <h5>trailer link</h5>
                  {/* <a
                    href={props.data.trailer.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.data.trailer.link}
                  </a> */}

                  <iframe
                    src={imdbLink}
                    title="trailer"
                    width="480"
                    height="270"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              ) : null}
              <div className="col">
                <img
                  className="img-thumbnail img-fluid text-center"
                  src={props.data.poster}
                  alt=""
                  style={{ margin: "auto", height: "50vh" }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
