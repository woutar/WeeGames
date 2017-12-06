import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchAllGames } from './components/FetchAllGames';
import { FetchAllPlatforms } from './components/FetchAllPlatforms';
import { FetchGame } from './components/FetchGame';
import { ShoppingCart } from './components/Shoppingcart';
import { FetchSearchResult} from './components/FetchSearchResult';
import {Login} from './components/Login';
// import {PieChart} from './components/barchart';
import {Main} from './components/main';
// import {Login}
import {Router} from 'react-router';

import { Redirect } from 'react-router';

import requireAuth from '../Authentication/require_authentication';




export const routes = <Layout>
  <Route component={requireAuth()} />
  <Route path="dashboard" component={requireAuth()} /> 

    <Route exact path='/' component={ FetchAllPlatforms } />
    <Route exact path='/' component={ FetchAllGames } />
    <Route path='/game/:id' component={ FetchAllPlatforms } />
    <Route path='/game/:id' component={ FetchGame } />
    <Route path='/shoppingcart' component={ FetchAllPlatforms } />
    <Route path='/shoppingcart' component={ ShoppingCart } />
    <Route path='/search/:searchquery' component={ FetchAllPlatforms } />
    <Route path='/main' component={ Main } />
    <Route path='/login' component={ Login } />

</Layout>;