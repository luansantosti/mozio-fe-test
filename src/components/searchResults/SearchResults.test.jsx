import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from './SearchResults'

const paramsWithoutCities = {
  passengers: 4,
}

const paramsWithCities = {
  passengers: 4,
  cities: 'Marseille,Nantes',
  date: '03/17/2023'
}

const paramsWithDijon = {
  passengers: 4,
  cities: 'Marseille,Dijon',
  date: '03/17/2023'
}

it('renders search results with no cities', () => {
  render(<SearchResults params={paramsWithoutCities} />)

  expect(screen.getByText('Oops! Something went wrong!')).toBeInTheDocument()
});

it('renders search results with cities', async () => {
  render(<SearchResults params={paramsWithCities} />)

  await waitFor(() => {
    expect(screen.getByText('Nantes')).toBeInTheDocument()
    expect(screen.getByText('Marseille')).toBeInTheDocument()
    expect(screen.getByText('Mar 17, 2023')).toBeInTheDocument()
  }, { timeout: 4000 });
});

it('renders search results with Dijon edge case error', async () => {
  render(<SearchResults params={paramsWithDijon} />)

  await waitFor(() => {
    expect(screen.getByText('Oops! Something went wrong!')).toBeInTheDocument()
  }, { timeout: 4000 });
});
