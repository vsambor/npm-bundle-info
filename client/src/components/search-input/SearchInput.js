import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete'
import classnames from 'classnames'
import './SearchInput.css';
import { getSuggestionsAPI } from '../../services/npmApi'


SearchInput.propTypes = {
  onItemSelected: PropTypes.func.isRequired
}

SearchInput.defaultProps = {
  onItemSelected: () => { console.warn('SearchInput prop [onItemSelected] is required') }
}

/**
 * Bundle search autocomplete component.
 * 
 *  - calls npm apis for suggestions based on user input
 *  - displays the suggestions
 *  - on form submit passes the selected bundle to onItemSelected prop
 * 
 * @param {Object} props - @see SearchInput.propTypes 
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

  const _handleOnSubmit = event => {
    event.preventDefault()

    const input = document.querySelector('.autocomplete-input');
    const [packageName, version] = input.value.split('@')
    const packageValue = {
      package: { version: version, name: packageName }
    }

    _handleOnSelect(packageName, packageValue)
  }

  const _renderSuggestionMenu = (items, value, style) => {
    return <div className="search-input-menu" children={items}></div>
  }

  const _renderSuggestionItem = (item, isHighlited) => {
    const key = item.package.name + item.package.version + item.searchScore

    return (
      <div className={classnames('search-input-suggestion-container',
        { 'search-input-suggestion-hover': isHighlited })} key={key}>
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
    <form className="search-input-container" onSubmit={_handleOnSubmit}>
      {/* TODO - replace with a mentained autocomplete component to avoid console warnings. */}
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
    </form>
  )
}

export default SearchInput
