import './App.scss'
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateNewTable from "./components/createTable/CreateNewTable";
import HomePage from "./components/homePage/HomePage";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import NavBar from "./components/navBar/NavBar"
import CollapsedNavBar from "./components/navBar/CollapsedNavBar"
import Footer from './components/footer/Footer';
import TableList from "./components/tableList/TableList";
import UpdateTable from "./components/updateTable/UpdateTable";

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


  const handleResize = () => {
    setWindowDimensions(getWindowDimensions())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  return (
    <div className="App">
      <Router>
        <header>
          {windowDimensions.width <= 500 ? (
            <CollapsedNavBar />
          ) : (<NavBar />)}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/TableList" element={<TableList />} />
            <Route path="/UpdateTable/:tableKey" element={<UpdateTable />} />
            <Route path='CreateNewTable' element={<CreateNewTable />} ></Route>
            <Route path='*' element={<PageNotFound />} ></Route>
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;