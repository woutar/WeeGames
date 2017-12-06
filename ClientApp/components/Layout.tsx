import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from './Search';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Search/>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    My account
                                    <span className="caret"></span></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <li className="dropdown-header">Ingelogd als: <br />testuser@gmail.com</li>
                                        <li className=""><a href="#">Wishlist</a></li>
                                        <li className=""><a href="#">Account settings</a></li>
                                        <li className=""><a href="#">Order history</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="wishlist-btn" href="#" target="_blank"></a>
                                </li>
                                <li>
                                    <a className="cart-btn" href="shoppingcart"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container main-container">
                    { this.props.children } 
                </div>
            </div>
            
    }
}
