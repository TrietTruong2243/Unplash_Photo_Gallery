import { useEffect, useState, useRef } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomSpinner from "../others/spinner";
function PhotoDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [photo, setPhoto] = useState(null); // Danh sách photo
  const [loading, setLoading] = useState(false); //Trạng thái loading
  const [error, setError] = useState(null); //Định nghĩa lỗi
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API;
  const isFetching = useRef(false);
  //Lấy và lưu dữ liệu ảnh bằng APU của Unsplash
  const fetchPhotos = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${UNSPLASH_API}${id}?client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setPhoto(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError(error.message);
    }
    setLoading(false);
    isFetching.current = false;
  };

  // Fetch ảnh khi id thay đổi
  useEffect(() => {
    if (id) {
      fetchPhotos();
    }
  }, [id]);

  // Hiển thị Loading state
  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  // Hiển thị khi không có ảnh
  if (!photo || photo.errors) {
    return <h1>No photo found</h1>;
  }

  return (
    <Card
      className="text-center"
      style={{ background: "#C0C0C0", margin: "50px" }}
    >
      <Card.Body>
        <Card.Img
          variant="center"
          src={photo.urls.full}
          style={{
            maxWidth: "80%",
            maxHeight: "800px",
            objectFit: "contain",
          }}
        />

        <Card.Title>{photo.title || "No Title Available"}</Card.Title>
        <Card.Text>{photo.description || "No Description Available"}</Card.Text>
        <Card.Text>Photo by {photo.user?.name || "Unknown"}.</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PhotoDetail;
