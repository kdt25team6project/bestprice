import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(keyword, searchType);
    }
  };

  const handleSearch = () => {
    onSearch(keyword, searchType);
  };

  const handleSelect = (type) => {
    setSearchType(type);
  };

  return (
    <div className="search-bar">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ width: '100px', height: '50px', margin: '5px' }}
        >
          {searchType === 'name' ? '요리 이름' : '재료'}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button className="dropdown-item" onClick={() => handleSelect('name')}>
              요리 이름
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleSelect('ingredient')}>
              재료
            </button>
          </li>
        </ul>
      </div>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={searchType === 'name' ? '요리 이름을 입력하세요.' : '재료를 입력하세요.'}
      />
      <button type="button" className="btn btn-secondary" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}

export default SearchBar;
