import { expect, afterEach, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const mockedUseNavigate = vitest.fn();

vitest.mock('react-router-dom', () => ({
  useSearchParams: () => [{}, vitest.fn()],
  useNavigate: () => mockedUseNavigate,
}));

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});