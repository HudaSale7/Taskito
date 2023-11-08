import { Outlet } from "react-router-dom"
import introImage from "./images/intro.svg"
import "./landingPage.css"; 

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="intro-text">
        <h1>
          Welcome to the <span className="logo">Taskito</span>!
        </h1>
        <p>
          Taskito is a task management app which helps you to stay organized,
          productive and to keep track of all your tasks and projects.
        </p>
      </div>
      <img src={introImage} alt="intro" className="intro-image" />
      <Outlet />
    </div>
  );
}

export default LandingPage;