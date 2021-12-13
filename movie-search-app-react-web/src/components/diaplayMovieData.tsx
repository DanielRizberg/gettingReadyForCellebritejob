import { displayMovieModel } from "../models/displayMovieModel";
import { movieData } from "../models/movieData";
import { Rating } from "./rating";

export function DisplayMovieData(props: displayMovieModel) {
  const getValueFromStorage = (movieTitle: string) => {
    let value = localStorage.getItem(movieTitle);
    if (value) {
      return Number(value);
    }

    return 0;
  };
  function setRatingValue(val: movieData): (value: number) => void {
    return (rating) => {
      localStorage.setItem(val.title, rating.toString());
    };
  }
  return (
    <div
      className="container-fluid"
      style={{ height: "85vh", overflow: "auto" }}
    >
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>title</th>
                <th>image</th>
                <th>rating</th>
                <th>year</th>
              </tr>
            </thead>
            <tbody>
              {props?.data?.map((val) => (
                <tr key={val.id}>
                  <td className="text-center align-middle" ><button type="button" className="btn btn-link">{val.title}</button></td>
                  <td >
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
                      valueChange={(value)=>val.rating=value.toString()}
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
