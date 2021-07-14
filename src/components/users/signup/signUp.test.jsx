import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import MainRouter from '../../../routers/index';

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <MainRouter />
    </MemoryRouter>
  );
}

TestRouter.propTypes = {
  path: PropTypes.string.isRequired,
};

describe('Sign Up view', () => {
  describe('When user is not logged-in', () => {
    it('renders the signup form', async () => {
      const signupRenderer = await renderer.create(<TestRouter path="/signup" />);
      const tree = signupRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
    });
  });
});
