import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from './Search';



export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className="main">
                    <div id="header-container" className="menu">
                        <ul>
                            <Search/>
                            <li><a href="">Home</a></li>
                            <li><a href="#">My Wishlist</a></li>
                            <li><a href="">Login</a></li>
                            <li className="shoppingcart"><a href="shoppingcart">Shopping cart</a></li>
                            
                        </ul>
                    </div>
                    <div className="container">
                        
                        { this.props.children }
                        
                    </div>
                </div>;
    }
}
