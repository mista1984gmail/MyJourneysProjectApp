import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JourneyList from "./JourneyList";
import JourneyEdit from "./JourneyEdit";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path='/journeys' exact={true} element={<JourneyList/>}/>
          <Route path='/journeys/:id' element={<JourneyEdit/>}/>
        </Routes>
      </Router>
  )
}

export default App;
