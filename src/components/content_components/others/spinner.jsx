import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';
function CustomSpinner() {
    //Định nghĩa loading với Spinner
  return (
    <Container
      fluid
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default CustomSpinner;