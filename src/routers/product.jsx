import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import ProductProfile from '../components/products/productProfile/productProfile';
import ProductUpdate from '../components/products/productUpdate/productUpdate';
import ProductDelete from '../components/products/productDelete/productDelete';
import ProductNew from '../components/products/productNew/productNew';

function ProductsRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <ProductNew />
      </Route>
      <Route path={`${path}/:productId/edit`}>
        <ProductUpdate />
      </Route>
      <Route path={`${path}/:productId/delete`}>
        <ProductDelete />
      </Route>
      <Route path={`${path}/:productId`}>
        <ProductProfile />
      </Route>
    </Switch>
  );
}

export default ProductsRouter;
