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
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>title</th>
                <th>image</th>
                <th>my rating</th>
              </tr>
            </thead>
            <tbody>
              {props?.data?.map((val) => (
                <tr key={val.id}>
                  <td className="text-center align-middle">{val.title}</td>
                  <td style={{ width: "50%" }}>
                    <img
                      src={val.image}
                      alt=""
                      className="img img-thumbnail img-fluid"
                      style={{ height: "40vh" }}
                    />
                  </td>
                  <td className="text-center align-middle">
                    <Rating
                      value={getValueFromStorage(val.title)}
                      maxValue={5}
                      valueChange={setRatingValue(val)}
                    ></Rating>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
