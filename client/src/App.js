import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Form from "./components/AuthForms/Form";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import Error from "./pages/Error";
import Post from "./pages/Post";
import { setViewForm } from "./reducers/reducerSlice";

function App() {
  const user = useSelector(state => state.reducerSlice.user);
  const viewForm = useSelector(state => state.reducerSlice.viewForm);
  // console.log(user);
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <Header />
        {viewForm && <Form />}
        <Routes>
          <Route path="/" element={<Home />} />
          {user !== null && <Route path="/profile" element={<Profile />} />}
          <Route path="/post/:postId" element= {<Post />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
