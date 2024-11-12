import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
      <div className="title-search-container">
          <h1 className="header-title" onClick={() => navigate('/')}>베스트 프라이스</h1>
          <div className="search-container">
            <select className="category-select">
              <option>레시피</option>
              <option>재료</option>
            </select>
            <input type="text" placeholder="요리 이름을 입력하세요." className="search-input" />
            <button className="search-button">검색</button>
          </div>
        </div>
      
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate('/')}>상품</button>
        <button className="nav-button" onClick={() => navigate('/')}>레시피</button>
        <button className="nav-button" onClick={() => navigate('/')}>자취팁</button>
        <button className="nav-button" onClick={() => navigate('/rank')}>랭킹</button>
        <button className="nav-button" onClick={() => navigate('/fridge')}>나만의 냉장고</button>
      </div>
      </div>

      <div className="login-container">
          <button className="login-button">로그인/회원가입</button>
      </div>
    </header>
  );
}

export default Header;