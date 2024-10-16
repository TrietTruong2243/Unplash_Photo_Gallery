import Card from "react-bootstrap/Card";

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
            objectFit: "contain", 
          }}
        />
      </div>
      <Card.Body>
      <Card.Title style={{ textDecoration: "none" }}>

            Author: {author}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PhotoCard;
