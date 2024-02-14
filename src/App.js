import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import { useEffect, useState } from "react";

const App = () => {
  const [path, setPath] = useState("/");

  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [path]);

  return (
    <Box>
      <Navbar path={path} setPath={setPath}/>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/movies" exact element={<Movies />}></Route>
        <Route path="/tvshows" exact element={<Tvshows />}></Route>
      </Routes>
    </Box>
  );
};

export default App;
