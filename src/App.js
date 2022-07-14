import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateNewTablePage from "./components/CreateTable/CreateNewTablePage";
import HomePage from "./components/HomePage/HomePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import NavBarPage from "./components/NavBar/NavBarPage"
import CollapsedNavBarPage from "./components/NavBar/CollapsedNavBarPage"
import FooterPage from './components/Footer/FooterPage';
import TableListPage from "./components/TableList/TableListPage";
import UpdateTablePage from "./components/UpdateTable/UpdateTablePage";
import useWindowSize from "./helpers/useWindowSize";
import './App.scss';

function App() {
  const windowDimensions = useWindowSize()

  return (
    <div className="App">
      <Router>
        <header>
          {windowDimensions.width <= 500 ? (
            <CollapsedNavBarPage />
          ) : (<NavBarPage />)}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/TableList" element={<TableListPage />} />
            <Route path="/UpdateTable/:tableKey" element={<UpdateTablePage />} />
            <Route path='CreateNewTable' element={<CreateNewTablePage />} ></Route>
            <Route path='*' element={<PageNotFound />} ></Route>
          </Routes>
        </main>
        <footer>
          <FooterPage />
        </footer>
      </Router>
    </div>
  );
}

export default App;