import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import {Provider} from "react-redux";
import store from "./Reducer/store";
import Home from './policycomponent/Home';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Routes>
        <Route index element={<Home/>}/>
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
