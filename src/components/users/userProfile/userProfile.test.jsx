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

const userId = '96ab7b63-915e-442b-b83f-e0962bd2c8d8';

const userResponse = {
  firstName: 'User Name 1',
  lastName: 'User Lastname 1',
  email: 'user@email.com',
  id: userId,
};

const commentsResponse = [
  {
    id: '26c08e2d-3caf-458b-9767-8477683668c8',
    text: 'Possitive comment',
    grade: 4,
    reviewerId: userId,
    storeId: '3e7ca498-8646-4493-bce6-b8cad8c5908e',
    store: {
      name: 'Name 1',
      address: 'Address 1',
    },
    reviewer: {
      firstName: 'User Name 1',
      lastName: 'User Lastname 1',
      email: 'user@email.com',
    },
  },
  {
    id: '26c08e2d-3caf-458b-9767-8477683668c9',
    text: 'Negative comment',
    grade: 1,
    reviewerId: userId,
    storeId: '3e7ca498-8646-4493-bce6-b8cad8c5908e',
    store: {
      name: 'Name 1',
      address: 'Address 1',
    },
    reviewer: {
      firstName: 'User Name 1',
      lastName: 'User Lastname 1',
      email: 'user@email.com',
    },
  },
];

const dealsResponse = [
  {
    id: '2927c6bb-d0c4-4583-b75f-e21f1a30b497',
    status: 'abierto',
    customerId: '96ab7b63-915e-442b-b83f-e0962bd2c8d8',
    storeId: '6f4e5985-2ff8-4118-bbaf-e6004d757c13',
    customer: {
      firstName: 'User Name 1',
      lastName: 'User Lastname 1',
      email: 'user@email.com',
      id: '96ab7b63-915e-442b-b83f-e0962bd2c8d8',
    },
    store: {
      name: 'Tienda 2',
      id: '6f4e5985-2ff8-4118-bbaf-e6004d757c13',
    },
    products: [
      {
        name: 'Product 2',
        price: 500,
        purchase: {
          dealId: '2927c6bb-d0c4-4583-b75f-e21f1a30b497',
          productId: 'a9aa09e7-83f8-4e95-b551-273cedf0afe3',
          amount: 4,
        },
      },
    ],
  },
];

const storesResponse = [
  {
    id: '6f4e5985-2ff8-4118-bbaf-e6004d757c13',
    address: 'Address 1',
    name: 'Store name 1',
    description: 'Description 1',
    ownerId: userId,
    picture: null,
  },
  {
    id: '9440a98a-2973-484b-b8bd-78beb6b24eef',
    address: 'Address 3',
    name: 'Store name 3',
    description: 'Description 3',
    ownerId: userId,
    picture: null,
  },
];

describe('Users profile', () => {
  describe('When user is not logged-in', () => {
    it('renders the profile of a given user', async () => {
      let storesRenderer;
      apiGet.mockImplementation((url) => {
        if (url === `/users/${userId}`) {
          return {
            data: userResponse,
            statusCode: 200,
          };
        }
        if (url === '/stores') {
          return {
            data: storesResponse,
            statusCode: 200,
          };
        }
        return {};
      });
      await renderer.act(async () => {
        storesRenderer = await renderer.create(<TestRouter path={`/users/${userId}`} />);
      });
      const tree = storesRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });
    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
    });
  });

  describe('When user is logged-in and check their own profile', () => {
    it('renders the profile of the logged-in user', async () => {
      let storesRenderer;
      apiGet.mockImplementation((url) => {
        if (url === '/users/me') {
          return {
            data: userResponse,
            statusCode: 200,
          };
        }
        if (url === '/stores') {
          return {
            data: storesResponse,
            statusCode: 200,
          };
        }
        if (url === '/users/me/comments') {
          return {
            data: commentsResponse,
            statusCode: 200,
          };
        }
        if (url === '/users/me/deals') {
          return {
            data: dealsResponse,
            statusCode: 200,
          };
        }
        return {};
      });
      await renderer.act(async () => {
        storesRenderer = await renderer.create(<TestRouter path="/users/my-profile" />);
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
