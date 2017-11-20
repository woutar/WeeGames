import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"

export class FetchSearchResult extends React.Component<RouteComponentProps<{searchquery : string}>>{
    constructor(props:RouteComponentProps<(searchquery: string)>){
        super(props);

    }

}