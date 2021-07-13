import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MainRouter from '../../routers/index';

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

describe('HomePage', () => {
  describe('When user is not logged-in', () => {
    it('renders the home page', () => {
      const tree = renderer.create(<TestRouter path="/" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
