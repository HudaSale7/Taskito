import { Link, Outlet } from "react-router-dom"

function Intro() {
  return (
    <>
      <h1>intro</h1>
      <Link to="/login">login</Link>
      <Link to="/sign-up">sign up</Link>
      <Outlet/>
    </>
  );
}

export default Intro