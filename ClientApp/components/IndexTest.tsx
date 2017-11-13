import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GamesTest } from './GamesTest';
import { Layout } from './Layout';



export interface LayoutProps {
    children?: React.ReactNode;
}

export class IndexTest extends React.Component<LayoutProps, {}> {
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
                        <div className="col-lg-2">
                            <div id="platform" className="sidebar">
                                
                                <h3>Platform</h3>
                                <ul>
                                    <li><a href="pcgames.html">PC Games</a></li>
                                    <li><a href="#">PSP Games</a></li>
                                    <li><a href="#">Playstation 1</a></li>
                                    <li><a href="#">Playstation 2</a></li>
                                    <li><a href="#">Playstation 3</a></li>
                                    <li><a href="ps4games.html">Playstation 4</a></li>
                                    <li><a href="#">NES Games</a></li>
                                    <li><a href="#">Nintendo Wii</a></li>
                                    <li><a href="#">XBOX 360</a></li>
                                    <li><a href="#">Nintendo DS</a></li>
                                    <li><a href="#">Nintendo 64</a></li>
                                    <li><a href="#">Gameboy</a></li>
                                    <li><a href="#">Consoles</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className="col-lg-8">
                            { this.props.children }
                        </div>
                        
                    </div>
                </div>;
    }
}