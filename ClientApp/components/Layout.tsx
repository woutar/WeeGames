import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FetchAllGames } from './FetchAllGames';



export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className="main">
                    <div id="header-container" className="menu">
                        <ul>
                            <li className="search"><input type="text" /><input type="submit" value="Search" /></li>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="wishlist.html">My Wishlist</a></li>
                            <li className="shoppingcart"><a href="shopping-cart.html">Shopping cart</a></li>
                        </ul>
                    </div>
                    <div className="container">
                        { this.props.children }
                        
                    </div>
                </div>;
    }
}
