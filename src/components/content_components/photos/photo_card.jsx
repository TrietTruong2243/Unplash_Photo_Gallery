import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function PhotoCard({ url, author }) {
    //Định nghĩa "Card" trong danh sách ảnh
  return (
    <Card style={{background: "#C0C0C0"}}>
      <div
        style={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Img
          variant="center"
          src={url}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain", // Giữ tỉ lệ hình ảnh
          }}
        />
      </div>
      <Card.Body>
        <Card.Title>{author}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PhotoCard;
