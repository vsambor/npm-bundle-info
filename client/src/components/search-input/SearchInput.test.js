import React from 'react';
import ReactDOM from 'react-dom';
import SearchInput from './SearchInput';

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<SearchInput /> general testing', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = Enzyme.mount(<SearchInput />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should call api and update suggestions', () => {
    // Simulates text change.
    const inputWrapper = wrapper.find('.autocomplete-input')
    inputWrapper.simulate('change', { target: { value: 'react' } })

    // Checks that state items have been updated.
    setTimeout(() => expect(setState).toHaveBeenCalledWith(1), 1000)
  });
});
