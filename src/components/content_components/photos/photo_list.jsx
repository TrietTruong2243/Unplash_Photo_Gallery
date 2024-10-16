import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom"; // Import Link for navigation

import React, { useEffect, useState, useCallback, useRef } from "react";
import PhotoCard from "./photo_card";
import CustomSpinner from "../others/spinner";

function PhotoList() {
  const [photos, setPhotos] = useState([]); //Danh sách ảnh
  const [page, setPage] = useState(1); //Thông tin về page
  const [loading, setLoading] = useState(false); //Trạng thái loading
  const [hasMore, setHasMore] = useState(true); //Trạng thái tìm thêm khi người dùng muốn scroll xuống để tải thêm hình ảnh
  const [errors, setErrors] = useState(null); //Định nghĩa lỗi
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API;
  const isFetching = useRef(false);
    //Lấy hình ảnh với API từ Unsplash
  const fetchPhotos = async (page) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    setErrors(null);
    try {
      const response = await fetch(
        `${UNSPLASH_API}?client_id=${ACCESS_KEY}&page=${page}`
      );

      const data = await response.json();

      // Kiểm tra nếu không còn ảnh để tải
      if (data.length === 0 || data.errors) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); // Cập nhật ảnh mới
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setErrors(error.message);
      setLoading(false);
    }
    setLoading(false);
    isFetching.current = false;
  };
  // Định nghĩa phương thức khi người dùng scroll đến cuối trang sẽ tăng page và tải thêm hình ảnh
  useEffect(() => {
    if (!hasMore) return; 

    const handleScroll = () => {
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);
  
  //Lấy hình ảnh lần đầu
  useEffect(() => {
    fetchPhotos(page);
  }, [page]);
  return (
    <Container>
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} md={4} className="mb-4">
            <Link to={`/photos/${photo.id}`}>
              <PhotoCard url={photo.urls.thumb} author={photo.user.name} />
            </Link>
          </Col>
        ))}
      </Row>

      {/* Phương thức loading*/}
      {loading && <CustomSpinner />}
      {/* Thông báo lỗi */}
      {errors && (
        <div className="text-center mt-4 text-danger">
          <h2>Error: {errors}</h2>
        </div>
      )}
      {/* Thông báo nếu hết ảnh */}
      {!hasMore && !loading && (
        <div className="text-center mt-4">
          <h2>No more photos to load.</h2>
        </div>
      )}
    </Container>
  );
}

export default PhotoList;
