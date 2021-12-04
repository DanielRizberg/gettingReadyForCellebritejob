import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { DisplayMovieData } from './components/diaplayMovieData';
import { Search } from './components/search';
import { movieData } from './models/movieData';

export function Main() {
  const [stateValue, seStateValue] = useState({
    data: [] as movieData[],
    loading: false,
  });
  const newData = (val: Array<movieData>) => {
    seStateValue({ data: val, loading: false });
  };
  const loaderHandler = (val: boolean) => {
    seStateValue({ ...stateValue, loading: val });
  };
  return (
    <div className="App">
      <Search newData={newData} loaderHandler={loaderHandler} />
      {!stateValue.loading ? (
        <DisplayMovieData data={stateValue.data} />
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
