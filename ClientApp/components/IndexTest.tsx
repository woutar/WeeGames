import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class IndexTest extends React.Component<{}, {}> {
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
                            <h2>Bestsellers</h2>
                            <div className="product product-001">
                                <a href="product_info_1.html">
                                    <div className="col-lg-3">
                                        <div className="product-image"></div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="product-info">
                                            <ul>
                                                <li className="title">Shadow of war</li>
                                                <li className="prijs">Price: &euro;60,-</li>
                                                <li className="genre">Genre: RPG</li>
                                                <li className="platform">Platform: Playstation 4</li>
                                                <li className="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta justo id erat bibendum,
                                                    a convallis justo elementum. Sed at magna sem. Nullam sed ultrices est. Aliquam luctus pretium quam et scelerisque.
                                                    Nullam in est tristique, facilisis enim vel, sodales lectus. In a vulputate lectus, et scelerisque tellus. Vivamus
                                                    non nisi accumsan, volutpat urna quis, pretium lacus. Fusce sagittis suscipit sapien, et porttitor ipsum fermentum et.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="product product-002">
                                <a href="product_info_2.html">
                                    <div className="col-lg-3">
                                        <div className="product-image"></div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="product-info">
                                            <ul>
                                                <li className="title">Overwatch</li>
                                                <li className="prijs">Price: &euro;19,95</li>
                                                <li className="genre">Genre: Shooter</li>
                                                <li className="platform">Platform: PC</li>
                                                <li className="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta justo id erat bibendum,
                                                    a convallis justo elementum. Sed at magna sem. Nullam sed ultrices est. Aliquam luctus pretium quam et scelerisque.
                                                    Nullam in est tristique, facilisis enim vel, sodales lectus. In a vulputate lectus, et scelerisque tellus. Vivamus
                                                    non nisi accumsan, volutpat urna quis, pretium lacus. Fusce sagittis suscipit sapien, et porttitor ipsum fermentum et.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="product product-003">
                                <a href="product_info_3.html">
                                    <div className="col-lg-3">
                                        <div className="product-image"></div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="product-info">
                                            <ul>
                                                <li className="title">South Park: The Fractured but Whole</li>
                                                <li className="prijs">Price: &euro;39,95</li>
                                                <li className="genre">Genre: RPG</li>
                                                <li className="platform">Platform: PC</li>
                                                <li className="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta justo id erat bibendum,
                                                    a convallis justo elementum. Sed at magna sem. Nullam sed ultrices est. Aliquam luctus pretium quam et scelerisque.
                                                    Nullam in est tristique, facilisis enim vel, sodales lectus. In a vulputate lectus, et scelerisque tellus. Vivamus
                                                    non nisi accumsan, volutpat urna quis, pretium lacus. Fusce sagittis suscipit sapien, et porttitor ipsum fermentum et.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}
