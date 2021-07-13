import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import MainRouter from '../../../routers/index';
import { apiGet } from '../../../apiService';

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

jest.mock('../../../apiService');

const storesResponse = [
  {
    id: '6f4e5985-2ff8-4118-bbaf-e6004d757c13',
    address: 'Address 1',
    name: 'Store name 1',
    description: 'Description 1',
    ownerId: '7d13c742-cd2d-45b7-9866-20dbb0eaa2e9',
    picture: null,
    createdAt: '2021-07-10T00:44:09.386Z',
    updatedAt: '2021-07-10T00:44:09.386Z',
  },
  {
    id: '3e7ca498-8646-4493-bce6-b8cad8c5908e',
    address: 'Address 2',
    name: 'Store name 2',
    description: 'Description 2',
    ownerId: '7d13c742-cd2d-45b7-9866-20dbb0eaa2e9',
    picture: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
    createdAt: '2021-07-10T00:44:09.386Z',
    updatedAt: '2021-07-10T00:44:09.386Z',
  },
  {
    id: '9440a98a-2973-484b-b8bd-78beb6b24eef',
    address: 'Address 3',
    name: 'Store name 3',
    description: 'Description 3',
    ownerId: '26cbed2e-b38c-461e-a387-977a6cbff6dc',
    picture: null,
    createdAt: '2021-07-10T00:44:09.386Z',
    updatedAt: '2021-07-10T00:44:09.386Z',
  },
];

describe('StoresList', () => {
  describe('When user is not logged-in', () => {
    it('renders the stores list', async () => {
      let storesRenderer;
      apiGet.mockImplementation(() => ({
        data: storesResponse,
        statusCode: 200,
      }));
      await renderer.act(async () => {
        storesRenderer = await renderer.create(<TestRouter path="/stores" />);
      });
      const tree = storesRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });

    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
    });
  });
});
