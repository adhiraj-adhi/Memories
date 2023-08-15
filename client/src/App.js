import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import { setViewForm } from "./reducers/reducerSlice";
import Error from "./pages/Error";

function App() {
  const user = useSelector(state => state.reducerSlice.user);
  console.log(user);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {user !== null && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<Error />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
