import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";

const App = () => (
  <BrowserRouter>
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/movies" exact element={<Movies />}></Route>
        <Route path="/tvshows" exact element={<Tvshows />}></Route>
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
