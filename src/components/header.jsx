import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
    //Thanh header của trang web
  return (
    <Navbar expand="lg" style={{ background: "#00FFFF" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Container>Photo Gallery from Unsplash</Container>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
