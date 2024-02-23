import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Tvshows from "./components/Tvshows";
import ContentDetail from "./components/ContentDetail";
import Footer from "./components/Footer";
import SearchFeed from "./components/SearchFeed";
import ScrollToTop from "./routes/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/movies" exact element={<Movies />}></Route>
          <Route path="/tvshows" element={<Tvshows />}></Route>
          <Route path="/movie/:id" element={<ContentDetail type='movie' />}></Route>
          <Route path="/tv/:id" element={<ContentDetail type='tv' />}></Route>
          <Route path="/search" element={<SearchFeed />}></Route>
          <Route path="/search/:searchTerm" element={<SearchFeed />}></Route>
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
