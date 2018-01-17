import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import 'isomorphic-fetch';

interface AdminMenuState {
    loading: boolean;
}

export class AdminMenu extends React.Component<RouteComponentProps<{}>, AdminMenuState> {
    constructor() {
        super();
    }

    
    public render() {
        if(sessionStorage.getItem("user") == null){
            window.location.href = "/";
        }
        let contents = AdminMenu.renderMenuItems();

        return <div className="col-md-2 sidebar">
                    { contents }
                </div>;
    }

    private static renderMenuItems(){
        return <ul className="nav nav-pills nav-stacked">
            <li>
                <a href="/admin/statistics">
                    Statistics
                </a>
            </li>
            <li>
                <a href="/admin/games">
                    Games overview
                </a>
            </li>
            <li>
                <a href="/admin/addGame">
                    Add game
                </a>
            </li>
            <li>
                <a href="/admin/users">
                    Users overview
                </a>
            </li>
            <li>
                <a href="/admin/adduser">
                    Add user
                </a>
            </li>
        </ul>;
    }
}

