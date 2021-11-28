import React  from "react";
import { ChangeEvent, Component } from "react";
import { distinctUntilChanged, fromEvent, throttleTime } from "rxjs";

export class Search extends Component {
 
 
  constructor(props:any) {
    super(props)
    
   let obs$=fromEvent(this.searchBox.current as HTMLInputElement,'input').pipe(distinctUntilChanged(),throttleTime(1000)).subscribe(x=>{

   })
  }
 
  state = {
    searchValue: "",
  };
   searchBox = React.createRef<HTMLInputElement>();

  handleChange = (event: ChangeEvent) => {
    const {name,value} = event.target as HTMLInputElement;

    this.setState({
      [name]: value,
    });


  };
  render() {
    const { searchValue } = this.state;
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
              ref={this.searchBox}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col">{searchValue}</div>
        </div>
      </div>
    );
  }
}
