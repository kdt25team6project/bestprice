import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">베스트 프라이스</h1>
      <div className="search-container">
        <select className="category-select">
          <option>요리 이름</option>
        </select>
        <input type="text" placeholder="요리 이름을 입력하세요." className="search-input" />
        <button className="search-button">검색</button>
      </div>
      <div className="login-container">
        <button className="login-button">로그인/회원가입</button>
        <button className="alert-button">알림/마이페이지</button>
      </div>
      <div className="nav-buttons">
        <button className="nav-button">상품</button>
        <button className="nav-button">레시피</button>
        <button className="nav-button">자취팁</button>
        <button className="nav-button">랭킹</button>
        <button className="nav-button">나만의 냉장고</button>
      </div>
    </header>
  );
}

export default Header;