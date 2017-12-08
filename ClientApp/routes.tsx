import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchAllGames } from './components/FetchAllGames';
import { FetchAllPlatforms } from './components/FetchAllPlatforms';
import { FetchGame } from './components/FetchGame';
import { ShoppingCart } from './components/Shoppingcart';
import { FetchSearchResult } from './components/FetchSearchResult';
import { FetchPlatformGames } from './components/FetchPlatformGames';
import { Register } from './components/Register'; 
import { Login } from './components/Login';
import { AdminFetchGames } from './components/Admin/AdminFetchGames'
import { Statistics } from './components/Admin/Statistics';

export const routes = <Layout>
    <Route exact path='/' component={ FetchAllPlatforms } />
    <Route exact path='/' component={ FetchAllGames } />
    <Route path='/game/' component={ FetchAllPlatforms } />
    <Route path='/game/:id' component={ FetchGame } />
    <Route path='/shoppingcart' component={ FetchAllPlatforms } />
    <Route path='/shoppingcart' component={ ShoppingCart } />
    <Route path='/search/' component={ FetchAllPlatforms } />
    <Route path='/search/:searchquery' component={ FetchSearchResult } />
    <Route path='/games' component={ FetchAllPlatforms} />
    <Route path='/games/:platform' component={ FetchPlatformGames} />
    <Route path='/register/' component= { Register } />
    <Route path='/login' component = { Login } />
    <Route path='/statistics' component = { Statistics } />
    <Route path='/admin' component={ AdminFetchGames } />
</Layout>; 

