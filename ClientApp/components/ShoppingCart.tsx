import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"



export class ShoppingCart extends React.Component<RouteComponentProps<{}>, {games : any[], total : number}> {
    constructor(){
        super();
        let stored_games = localStorage.getItem("ShoppingCart")
        if(stored_games != null){
            let inventory_games = JSON.parse(stored_games);
            let duplicates :any = {};
            let amounts :any = {}; 
            inventory_games = inventory_games.filter(function(currentObject : any){
                if (currentObject.id in duplicates) {
                    amounts[currentObject.id] += 1;
                    return false;
                } else {
                    duplicates[currentObject.id] = true;
                    amounts[currentObject.id] = 1;
                    return true;
                }
            });

            // Add the duplicate amount of games to the games collection
            // Also add the total price
            var total = 0;
            var i;
            for(i = 0; i < inventory_games.length; i++){
                var amount = inventory_games[i]['amount'] = amounts[inventory_games[i].id];
                total += (amount * inventory_games[i].price);
            }

            //set the state equal to the collection of games
            this.state = {games: inventory_games, total : total};
        }    
    }

    public render() {
        return <div className="col-lg-8">
        <h2>Shoppingcart</h2>
        {this.state.games.map(game =>
        <div className="product" key= { game.id }>
            <Link to={"/game/" + game.id}>
            <div className="col-lg-3">
                <img height="150" width="150" src={game.image} /> 
            </div>
                <div className="col-lg-9">
                    <div className="product-info">
                        <ul>
                            <li className="title">{ game.title }</li>
                            <li className="genre">Genre: { game.category.name }</li>
                            <li className="platform">Platform: {game.platform.name }</li>
                            <li className="prijs">Price: &euro;{ game.price }</li>
                            <li className="prijs">Amount: { game.amount }</li>
                            <li className="prijs">Subtotal: &euro; { game.amount * game.price }</li>
                        </ul>
                    </div>
                </div>
            </Link>
        </div>
        )}

        <div className="checkout-wrapper">
            <div className="total">Grandtotal: &euro; {this.state.total}</div>
            <a href="contactdetails.html"><div className="cart-button checkout-button" id="cart-button">Checkout</div></a>
        </div>
    </div>
    }
}
