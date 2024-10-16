import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
    //Thanh header của trang web
  return (
    <Navbar expand="lg" style={{ background: "#0099FF" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Container>Unsplash Photo Gallery</Container>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
