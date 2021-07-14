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

describe('Login view', () => {
  describe('When user is not logged-in', () => {
    it('renders the login form', async () => {
      const loginRenderer = await renderer.create(<TestRouter path="/login" />);
      const tree = loginRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
    });
  });
});
