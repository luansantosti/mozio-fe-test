import { Route, Routes } from "react-router-dom"

import Error from "./pages/error";
import Home from "./pages/home";
import Results from "./pages/results";

const WrapperRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/result" element={<Results />} />
    <Route path="*" element={<Error />} />
  </Routes>
)

export default WrapperRoutes