import React, {useState} from 'react';
import './SearchInput.css';
import {getSuggestions} from '../../services/npmApi'

function SearchInput() {

  const handleOnChange = e => {
    console.log('e', e.target.value)
    getSuggestions(e.target.value)
  }

  return (
    <div className="search-input-container">
      <input type="text" onChange={handleOnChange}></input>
    </div>
  );
}

export default SearchInput;