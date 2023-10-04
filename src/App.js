import Home from "./components/HomePage/Home";
import Tab from "./components/Tab/Tab";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tab" element={<Tab />} />
      </Routes>
    </>
  );
}

export default App;
