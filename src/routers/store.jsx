import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import ProductsRouter from './product';
import StoresList from '../components/stores/storesList/storesList';
import StoreProfile from '../components/stores/storeProfile/storeProfile';
import StoreUpdate from '../components/stores/storeUpdate/storeUpdate';
import StoreDelete from '../components/stores/storeDelete/storeDelete';
import StoreNew from '../components/stores/storeNew/storeNew';
import DealsRouter from './deals';

function StoresRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <StoresList />
      </Route>
      <Route path={`${path}/new`}>
        <StoreNew />
      </Route>
      <Route path={`${path}/:storeId/edit`}>
        <StoreUpdate />
      </Route>
      <Route path={`${path}/:storeId/delete`}>
        <StoreDelete />
      </Route>
      <Route path={`${path}/:storeId/deals`}>
        <DealsRouter />
      </Route>
      <Route path={`${path}/:storeId/products`}>
        <ProductsRouter />
      </Route>
      <Route path={`${path}/:storeId`}>
        <StoreProfile />
      </Route>
    </Switch>
  );
}

export default StoresRouter;
