import React, { useEffect, useState } from "react";
import { distinctUntilChanged, fromEvent, map, throttleTime } from "rxjs";
import { searchProps } from "../models/searchModel";


export function Search(props: searchProps) {
  const [searchValue, setSearchValue] = useState('');

  const textEl = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sub = fromEvent(textEl.current as HTMLInputElement, "input")
      .pipe(
        map((x) => (x.target as any).value as string),
        distinctUntilChanged(),
        throttleTime(1000)
      )
      .subscribe((value) => {
       console.log(value)
       props.newData(['hello'])
      });

    return () => sub.unsubscribe();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-start">
          <input
            type="search"
            placeholder="type here to search a movie"
            className="form-control  my-2"
            value={searchValue}
            name="searchValue"
            id="searchValue"
            ref={textEl}
            onChange= {e=> 
              {
                setSearchValue(e.target.value);
               
            }
          }
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col">{searchValue}</div>
      </div>
    </div>
  );
}
