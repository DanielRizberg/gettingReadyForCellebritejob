import { displayMovieModel } from "../models/displayMovieModel";

export function DisplayMovieData(props: displayMovieModel) {
  return (
    <div className="container-fluid" style={{height:'85vh',overflow:'auto'}}>
      <div className="row">
        <div className="col">
          <table className="table table-bordered" >
            <thead>
                <tr>
                <th>title</th>
              <th>image</th>
                </tr>
            
            </thead>
            <tbody>
              {props?.data?.map((val) => (
                <tr key={val.id}>
                  <td className="text-center align-middle">{val.title}</td>
                  <td style={{width:'50%'}}>
                    <img src={val.image} alt="" className="img img-thumbnail img-fluid" style={{'height':'40vh'}} />
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
