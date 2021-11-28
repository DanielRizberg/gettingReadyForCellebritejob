import { ChangeEvent, Component } from "react";

export class Search extends Component {
  initialState = {
    searchValue: "",
  };

  state = this.initialState;

  handleChange = (event: ChangeEvent) => {
    const {name,value} = event.target as HTMLInputElement;
console.log(name)
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
