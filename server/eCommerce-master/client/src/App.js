import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState.js';
import Header from './comonents/headers/Header';
import Mainpages from './comonents/mainPages/Pages';
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Mainpages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
