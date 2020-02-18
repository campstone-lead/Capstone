import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import BookerSignup1 from './pages/booker/Signup/BookerSignup1'
import axiosMock from 'axios'

jest.mock('axios')

afterEach(cleanup)

test('renders without crashing', () => {
  const { baseElement } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(baseElement).toBeDefined();
});

test('renders without crashing', () => {
  const { baseElement } = render(
    <Provider store={store}>
      <BookerSignup1 />
    </Provider>
  );
  expect(baseElement).toBeDefined();
});
