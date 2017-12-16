import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { FetchAllGames } from './components/FetchAllGames';
import { FetchAllPlatforms } from './components/FetchAllPlatforms';
import { FetchGame } from './components/FetchGame';
import { ShoppingCart } from './components/Shoppingcart';
import { FetchSearchResult } from './components/FetchSearchResult';
import { FetchPlatformGames } from './components/FetchPlatformGames';
import { Register } from './components/Register'; 
import { LoginPage } from './components/LoginPage';
import { Checkout } from './components/Checkout';
import { AdminMenu } from './components/Admin/AdminMenu'
import { AdminFetchGames } from './components/Admin/AdminFetchGames'
import { Statistics } from './components/Admin/Statistics';
import { InsertGame } from './components/Admin/InsertGame';



export const routes = <Layout>
    <Route exact path='/' component={ FetchAllPlatforms } />
    <Route exact path='/' component={ FetchAllGames } />
    <Route path='/game/' component={ FetchAllPlatforms } />
    <Route path='/game/:id' component={ FetchGame } />
    <Route path='/shoppingcart' component={ FetchAllPlatforms } />
    <Route path='/shoppingcart' component={ ShoppingCart } />
    <Route path='/checkout' component = { Checkout  } />
    <Route path='/search/' component={ FetchAllPlatforms } />
    <Route path='/search/:searchquery' component={ FetchSearchResult } />
    <Route path='/games' component={ FetchAllPlatforms} />
    <Route path='/games/:platform' component={ FetchPlatformGames} />
    <Route path='/register/' component= { Register } />
    <Route path='/login' component = { LoginPage } />
    <Route path='/statistics' component = { Statistics } />
    <Route path='/admin/' component={ AdminMenu } />
    <Route path='/admin/statistics' component={ Statistics } />
    <Route path='/admin/games' component={ AdminFetchGames } />
    <Route path='/admin/addGame' component={ InsertGame } />
</Layout>; 

