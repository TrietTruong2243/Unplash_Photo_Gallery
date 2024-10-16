import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import React Router
import PhotoList from "./content_components/photos/photo_list"
import PhotoDetail from "./content_components/photo_detail/photo_details"; // Component chi tiết ảnh
import NotFoundPage from "./content_components/error/notfound_page";

function Content() {
    //Nội dung của trang web
  return (
    <div className="content" style={{ paddingTop: "20px"}}> 
      <Routes>
        {/* Định nghĩa đường dẫn đến trang chủ*/ }
        <Route path="/" element={<Navigate to="photos"></Navigate>}></Route>
        {/* Định nghĩa đường dẫn tới danh sách ảnh */}
        <Route path="/photos" element={<PhotoList />} />
        {/* Định nghĩa đường dẫn tới chi tiết ảnh, với id ảnh */}
        <Route path="/photos/:id" element={<PhotoDetail />} />
                {/* Định nghĩa đường dẫn trang không phù hợp*/ }
        <Route path="*" element = {<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </div>
  );
}

export default Content;
