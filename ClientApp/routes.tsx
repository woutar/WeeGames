import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { GamesTest } from './components/GamesTest';
import { IndexTest } from './components/IndexTest';

export const routes = <IndexTest>
    {/* <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } /> */}
    <Route exact path='/' component={ GamesTest } />
    <Route exact path='/' component={ FetchData } />

</IndexTest>;

