import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchAllGames } from './components/FetchAllGames';
import { FetchAllPlatforms } from './components/FetchAllPlatforms';
import { FetchGame } from './components/FetchGame';
import { ShoppingCart } from './components/Shoppingcart';

export const routes = <Layout>
    <Route exact path='/' component={ FetchAllPlatforms } />
    <Route exact path='/' component={ FetchAllGames } />
    <Route path='/game/:id' component={ FetchAllPlatforms } />
    <Route path='/game/:id' component={ FetchGame } />
    <Route path='/shoppingcart' component={ FetchAllPlatforms } />
    <Route path='/shoppingcart' component={ ShoppingCart } />
</Layout>;

