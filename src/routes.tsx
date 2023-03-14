import { Route, Routes } from "react-router-dom"

import Error from "./pages/error";
import Home from "./pages/home";

const WrapperRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/result" element={<div> result </div>} />
    <Route path="*" element={<Error />} />
  </Routes>
)

export default WrapperRoutes