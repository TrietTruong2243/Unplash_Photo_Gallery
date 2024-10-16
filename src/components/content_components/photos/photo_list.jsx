import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState, useCallback, useRef } from "react";
import PhotoCard from "./photo_card";

function PhotoList() {
  const [photos, setPhotos] = useState([]); // Cập nhật đúng tên biến
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ACCESS_KEY = "lJ_ghR4samPGuSjKTQHw-ivbggipU6kZJu0BcRIBf7M";
  const isFetching = useRef(false);

  const fetchImages = async (page) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}`
      );
      const data = await response.json();

      // Kiểm tra nếu không còn ảnh để tải
      if (data.length === 0 || data.errors) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); // Cập nhật ảnh mới
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
    isFetching.current = false;
  };
  // Infinite Scroll: Kích hoạt khi cuộn tới cuối trang
  useEffect(() => {
    if (!hasMore) return; // Nếu không còn ảnh thì không cần cuộn

    const handleScroll = () => {
      // Tính khoảng cách từ cuối trang và xem người dùng có cuộn tới cuối chưa
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Tăng trang
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, [loading, hasMore]);
  // Gọi fetchImages khi component mount lần đầu
  useEffect(() => {
    fetchImages(page);
  }, [page]);
  console.log(photos);
  return (
    <Container>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} md={4} className="mb-4">
            <PhotoCard url={photo.urls.thumb} author={photo.user.name} />
          </Col>
        ))}
      </Row>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      )}

      {/* Thông báo nếu hết ảnh */}
      {!hasMore && !loading && (
        <div className="text-center mt-4">
          <p>No more photos to load.</p>
        </div>
      )}
    </Container>
  );
}

export default PhotoList;
