import { DisplayMovieData } from 'components/diaplayMovieData';
import { Search } from 'components/search';
import { movieImdbData } from 'models/movieExtraData';
import { useState } from 'react';

function App() {
  const [stateValue, seStateValue] = useState({
    data: [] as movieImdbData[],
    loading: false,
    showAppImageIntro: true,
  });
  const newData = (val: Array<movieImdbData>) => {
    // console.log(val)
    seStateValue({ ...stateValue, data: val, loading: false });
  };
  const loaderHandler = (val: boolean) => {
    //  console.log(val)
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

export default App;

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hello />} />
//       </Routes>
//     </Router>
//   );
// }
