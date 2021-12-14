import { useState } from "react";
import { displayMovieModel } from "../models/displayMovieModel";
import { MovieDetails } from "./movieDetails";
import { Rating } from "./rating";
import './displayMovieData.css';
export function DisplayMovieData(props: displayMovieModel) {
  const [showDetails, setShowDetails] = useState(
    props.data.map((x) => {
      return { show: false };
    })
  );
  function handleShow(index: number, isShow: boolean) {
    let retVal = showDetails.map((x, y) =>
      y === index ? Object.assign({}, { show: isShow }) : Object.assign({}, x)
    );

    return retVal;
  }
  return (
    <div
      className="container-fluid"
      style={{ height: "85vh", overflow: "auto" }}
    >
      <div className="row">
        <div className="col">
          <table className="table  table-hover">
            <thead>
              <tr>
                <th>title</th>
                <th>image</th>
                <th>rating</th>
                <th>year</th>
              </tr>
            </thead>
            <tbody>
              {props?.data?.map((val, index) => (
                <tr key={val.id}>
                  <td className="text-center align-middle">
                    <button
                  
                      type="button"
                      className="btn btn-link data-btn"
                      onClick={() => {
                        setShowDetails(handleShow(index, true));
                      }}
                    >
                      {val.title}
                    </button>
                    <MovieDetails
                      id={index}
                      handleClose={() => {
                        setShowDetails(handleShow(index, false));
                      }}
                      data={val}
                      show={showDetails[index].show}
                    ></MovieDetails>
                  </td>
                  <td>
                    <img
                      src={val.poster}
                      alt=""
                      className="img img-thumbnail img-fluid"
                      style={{ height: "45vh" }}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <Rating
                      value={Number(val.rating)}
                      maxValue={10}
                      valueChange={(value) => (val.rating = value.toString())}
                    ></Rating>
                  </td>
                  <td className="text-center align-middle">{val.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
