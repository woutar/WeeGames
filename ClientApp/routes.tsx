import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchAllGames } from './components/FetchAllGames';
import { Product } from './components/Product';
import { Imaget } from './components/Imaget';

export const routes = <Layout>
    {/* <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } /> */}
    <Route exact path='/' component={ FetchAllGames } />
    <Route path='/productpage/:id' component={ Product } />
</Layout>;

