import { Fragment, useState } from "react";
import { ratingModel } from "../models/ratingModel";
import "./rating.css";
export function Rating(props: ratingModel) {
  const [rating, setRating] = useState(() => {
    let ratings = [];
    for (let index = 0; index < props.maxValue; index++) {
      let rating = {
        id: index + 1,
        checked: index + 1 <= props.value && props.value > 0,
      };
      ratings.push(rating);
    }

    return ratings;
  });

  return (
   
    <Fragment>
     <div>{props.value}</div>
      {
      rating.map((r) => (
        <span
          key={r.id}
          className={`fa fa-star ${r.checked ? "checked" : ""}`}
          onClick={() =>
            setRating(() => {
              let newRating = [];
              for (let index = 0; index < props.maxValue; index++) {
                let rating = { id: index + 1, checked: index + 1 <= r.id };
                newRating.push(rating);
              }
              props.valueChange(r.id)
              return newRating;
            })
          }
        ></span>
      ))}
    </Fragment>
  );
}
