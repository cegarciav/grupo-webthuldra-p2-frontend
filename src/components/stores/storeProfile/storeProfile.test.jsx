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

const storeId = '6f4e5985-2ff8-4118-bbaf-e6004d757c13';

const storeResponse = {
  storeId,
  address: 'Address 1',
  name: 'Name 1',
  description: 'Description 1',
  ownerId: '7d13c742-cd2d-45b7-9866-20dbb0eaa2e9',
  picture: null,
  owner: {
    firstName: 'Owner Name',
    lastName: 'Owner Lastname',
    email: 'owner@email.com',
  },
};

const commentsResponse = [
  {
    id: '26c08e2d-3caf-458b-9767-8477683668c8',
    text: 'Possitive comment',
    grade: 4,
    reviewerId: '96ab7b63-915e-442b-b83f-e0962bd2c8d8',
    storeId,
    store: {
      name: 'Name 1',
      address: 'Address 1',
    },
    reviewer: {
      firstName: 'Reviewer Name',
      lastName: 'Reviewer Lastname',
      email: 'reviewer@email.com',
    },
  },
  {
    id: '26c08e2d-3caf-458b-9767-8477683668c9',
    text: 'Negative comment',
    grade: 1,
    reviewerId: '96ab7b63-915e-442b-b83f-e0962bd2c8d8',
    storeId,
    store: {
      name: 'Name 1',
      address: 'Address 1',
    },
    reviewer: {
      firstName: 'Reviewer Name 2',
      lastName: 'Reviewer Lastname 2',
      email: 'reviewer2@email.com',
    },
  },
];

const productsResponse = [
  {
    id: 'a9aa09e7-83f8-4e95-b551-273cedf0afe3',
    name: 'Product 1',
    stock: 20,
    price: 500,
    unit: 'Unidad',
    storeId,
    picture: null,
  },
  {
    id: 'a3de523e-a264-4479-b1e9-d1da5d228caf',
    name: 'Product 2',
    stock: 15,
    price: 750,
    unit: 'Unidad',
    storeId,
    picture: null,
  },
  {
    id: '836fa52e-cece-4a60-ac9d-dabc46e50814',
    name: 'Product 3',
    stock: 10,
    price: 850,
    storeId,
    picture: null,
  },
];

describe('StoreProfile', () => {
  describe('When user is not logged-in', () => {
    it('renders the profile of the store', async () => {
      let storesRenderer;
      apiGet.mockImplementation((url) => {
        if (url === `/stores/${storeId}`) {
          return {
            data: storeResponse,
            statusCode: 200,
          };
        }
        if (url === `/stores/${storeId}/comments`) {
          return {
            data: commentsResponse,
            statusCode: 200,
          };
        }
        if (url === `/stores/${storeId}/products`) {
          return {
            data: productsResponse,
            statusCode: 200,
          };
        }
        return {};
      });
      await renderer.act(async () => {
        storesRenderer = await renderer.create(<TestRouter path={`/stores/${storeId}`} />);
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
