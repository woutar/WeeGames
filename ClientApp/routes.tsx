import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchAllGames } from './components/FetchAllGames';
import { FetchAllPlatforms } from './components/FetchAllPlatforms';
import { FetchGame } from './components/FetchGame';
import { ShoppingCart } from './components/Shoppingcart';
import { FetchSearchResult } from './components/FetchSearchResult';
import { FetchPlatformGames } from './components/FetchPlatformGames';
import { RegisterPage } from './components/RegisterPage'; 
import { LoginPage } from './components/LoginPage';
import { Checkout } from './components/Checkout';
import { UserPage } from './components/UserPage';
import { OrderHistory } from './components/OrderHistory';
import { Wishlist } from './components/Wishlist';

//Admin
import { AdminMenu } from './components/Admin/AdminMenu'
import { AdminFetchGames } from './components/Admin/AdminFetchGames'
import { Statistics } from './components/Admin/Statistics';
import { InsertGame } from './components/Admin/InsertGame';
import { UpdateGame } from './components/Admin/UpdateGame';



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
    <Route path='/games/:platform' component={ FetchAllPlatforms} />
    <Route path='/games/:platform' component={ FetchPlatformGames} />
    <Route path='/register/' component= { RegisterPage } />
    <Route path='/login' component = { LoginPage } />
    <Route path='/user' component = { UserPage } />
    <Route path='/orderhistory' component = { OrderHistory } />
    <Route path='/wishlist' component = { Wishlist } />


    <Route path='/admin/' component={ AdminMenu } />
    <Route path='/admin/statistics' component={ Statistics } />
    <Route path='/admin/games' component={ AdminFetchGames } />
    <Route path='/admin/addGame' component={ InsertGame } />
    <Route path='/admin/updategame/:id' component={UpdateGame} />
</Layout>; 

