import React, { useEffect, useState } from "react";

import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  switchMap,
  tap,
  throttleTime,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { movieData } from "../models/movieData";

import { searchProps } from "../models/searchModel";
import "./search.css";
export function Search(props: searchProps) {
  const [searchValue, setSearchValue] = useState("");

  const textEl = React.useRef<HTMLInputElement>(null);
  const buttonEl = React.useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const ClickEvent = fromEvent(
      buttonEl.current as HTMLInputElement,
      "click"
    ).pipe(map((x) => searchValue));
    const inputEvent = fromEvent(
      textEl.current as HTMLInputElement,
      "input"
    ).pipe(map((x) => (x.target as any).value as string));
    const enterEvent = fromEvent(
      textEl.current as HTMLInputElement,
      "keyup"
    ).pipe(
      filter((e) => (e as KeyboardEvent).key === "Enter"),
      map((x) => (x.target as any).value as string)
    );
    const sub = merge(inputEvent, enterEvent, ClickEvent)
      .pipe(
        throttleTime(1000),
        distinctUntilChanged(),
        filter((x) => x !== ""),
        switchMap((val) =>
          getData(val).pipe(
            tap(() => {
              props.loaderHandler(true);
            })
          )
        )
      )
      .subscribe((value) => {
       props.newData(value as any[])
      });

    return () => sub.unsubscribe();
  }, [props]);
  const getData = (val: string) => {
    let obs$ = fromFetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${val}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":
            "a5abc19a4bmsh6004678e99f8413p1a46a7jsn35b65af042e1",
        },
      }
    ).pipe(
      switchMap((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return of({
            error: true,
            message: `Error ${res.status} ${res.statusText}`,
          });
        }
      }),
      map((json) => json.titles as Array<movieData>),
      catchError((err) => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    );

    return obs$;
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-start">
          <div className="input-group my-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              id="searchButton"
              ref={buttonEl}
            >
              <i className="fa fa-search"></i>
            </button>

            <input
              type="text"
              placeholder="type here to search a movie"
              className="form-control "
              value={searchValue}
              name="searchValue"
              id="searchValue"
              ref={textEl}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
