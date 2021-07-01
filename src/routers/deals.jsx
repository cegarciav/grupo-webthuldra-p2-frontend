import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import DealProfile from '../components/deals/dealProfile/dealProfile';

function ProductsRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:dealId`}>
        <DealProfile />
      </Route>
    </Switch>
  );
}

export default ProductsRouter;
