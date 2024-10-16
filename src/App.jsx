import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Content from "./components/content_routes";
import {  BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

function App() {
    //Khởi tạo trang web với Header và Content
  return (
    <>
      <Router>
        <Header />
        <Content></Content>
      </Router>
    </>
  );
}

export default App;
