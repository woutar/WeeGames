import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"



export class ShoppingCart extends React.Component<RouteComponentProps<{}>, {games : Models.Game[]}> {
    constructor(){
        super();
        let stored_games = localStorage.getItem("ShoppingCart")
        if(stored_games != null){
            let inventory_games = JSON.parse(stored_games)
            this.state = {games: inventory_games}
        }        

    }

    public render() {
        return <div className="col-lg-8">
        <h2>Shoppingcart</h2>
        {this.state.games.map(game =>
        <div className="product product-001">
            <a href="product_info_1.html">
                <div className="col-lg-3">
                    <div className="product-image"></div>
                </div>
                <div className="col-lg-9">
                    <div className="product-info">
                        <ul>
                            <li className="title">{ game.title }</li>
                            <li className="prijs">Price: &euro;{ game.price }</li>
                            <li className="genre">Genre: { game.category.name }</li>
                            <li className="platform">Platform: {game.platform.name }</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
        )}

        <div className="checkout-wrapper">
            <div className="total">Grandtotal: €124,95</div>
            <a href="contactdetails.html"><div className="cart-button checkout-button" id="cart-button">Checkout</div></a>
        </div>
    </div>
    }
}
