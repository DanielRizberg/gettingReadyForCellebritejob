import { displayMovieModel } from "../models/displayMovieModel";
import { Rating } from "./rating";

export function DisplayMovieData(props: displayMovieModel) {
  
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
                   <Rating value={val.rating?val.rating:0} maxValue={5} valueChange={val=>{}}></Rating>
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
