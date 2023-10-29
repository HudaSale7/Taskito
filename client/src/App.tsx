import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar/navbar";
import Intro from "./components/Intro/intro";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signup";
import SideBar from "./components/SideBar/sidebar";
import Workspace from "./components/Workspace/workspace";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/workspace" element={<SideBar />}>
            <Route path="/workspace/:id" element={<Workspace />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
