import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete'
import './SearchInput.css';
import { getSuggestionsAPI } from '../../services/npmApi'


SearchInput.propTypes = {
  onItemSelected: PropTypes.func.isRequired
}

SearchInput.defaultProps = {
  onItemSelected: () => { console.warn('SearchInput prop [onItemSelected] is required') }
};

/**
 * Bundle search autocomplete component.
 * 
 *  - calls npm apis for suggestions based on user input
 *  - displays the suggestions
 *  - on form submit passes the selected bundle to onItemSelected prop
 */
function SearchInput(props) {
  const { onItemSelected } = props
  const [items, setItems] = useState([])
  const [selectedBundle, setSelectedBundle] = useState('')

  // TODO - use debounce for perf.
  const _handleOnChange = e => {
    const inputValue = e.target.value

    setSelectedBundle(inputValue || '')

    if (inputValue) {
      getSuggestionsAPI(inputValue).then(items => setItems(items))
    }
  }

  const _handleOnSelect = (itemText, itemValue) => {
    const itemWithVersion = itemText + `@${itemValue.package.version}`
    setSelectedBundle(itemWithVersion)
    onItemSelected(itemValue)
  }

  const _renderSuggestionMenu = (items, value, style) => {
    return <div className="search-input-menu" children={items}></div>
  }

  const _renderSuggestionItem = item => {
    return (
      <div className="search-input-suggestion-container">
        <div className="search-input-suggestion-name">
          {item.package.name}
        </div>
        <div className="search-input-suggestion-description">
          {item.package.description}
        </div>
      </div>
    )
  }

  return (
    <div className="search-input-container">
      <Autocomplete
        inputProps={{ placeholder: 'Search package...', className: 'autocomplete-input' }}
        getItemValue={item => item.package.name}
        items={items}
        renderMenu={_renderSuggestionMenu}
        renderItem={_renderSuggestionItem}
        value={selectedBundle}
        onChange={_handleOnChange}
        onSelect={_handleOnSelect}
      />
    </div>
  )
}

export default SearchInput
