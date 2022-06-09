import react from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import LandingPage from './index.jsx';

describe('<LandingPage />', () => {
  test('Renders an element with the text Home', () => {
    const component = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    expect(component.container).toHaveTextContent('Home');
  });

  test('Have a link element', () => {
    const component = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    const link = component.container.querySelector('a');

    expect(component.container).toContainElement(link);
  });

  test('Have the className landing-page', () => {
    const component = render(
      <BrowserRouter>
        <LandingPage className />
      </BrowserRouter>
    );

    expect(component.container.querySelector('.landing-page')).toHaveClass('landing-page');
  });
});
