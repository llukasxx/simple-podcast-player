import React from 'react';
import { render } from 'react-testing-library';
import App from '../App';

test('The app renders without a crash', () => {
  render(<App />);
});
