import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/movies" exact element={<Movies />}></Route>
          <Route path="/tvshows" element={<Tvshows />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
