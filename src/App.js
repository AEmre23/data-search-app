import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.js'
import SearchResult from './pages/SearchResult.js'
import AddLink from './pages/AddLink.js'
import PeopleProvider from "./context/PeopleContext.js";

function App() {
  return (
    <PeopleProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="result" element={<SearchResult />} />
        <Route path="add" element={<AddLink />} />
      </Routes>
    </PeopleProvider>
  );
}

export default App;
