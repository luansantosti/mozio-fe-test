import { render, screen } from '@testing-library/react';
import SearchForm from './SearchForm'

const params = {
  passengers: 4,
}

it('renders search form', () => {
  render(<SearchForm params={params} />);

  const inputPassengers = screen.getByLabelText('Passengers')
  
  expect(parseInt(inputPassengers?.value)).toBe(4)
});