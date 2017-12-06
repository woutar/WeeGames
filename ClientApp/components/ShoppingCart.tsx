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
        return <div className="col-md-10 content">
        <h2>Shoppingcart</h2>
        {this.state.games.map(game =>
            <div className="row product" key={ game.id }>
                <Link to={"/game/" + game.id}>
                    <div className="row">
                        <div className="col-sm-3">
                            <img src={game.image} />
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="title">{ game.title }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Categorie: </span><span className="category">{ game.category.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Platform: </span><span className="platform">{ game.platform.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Price: </span><span className="price">{ game.price },-</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Amount: </span><span className="price">Amount: { game.amount }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Subtotal: </span><span className="price">Subtotal: &euro; { game.amount * game.price }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="description">
                                        { game.description }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                </div>
        )}

        <div className="checkout-wrapper">
            <div className="row">
                <div className="col-sm-9"></div>
                <div className="col-sm-3">
                        <span className="total">Grandtotal: &euro; {this.state.total}</span>
                        <a href="shoppingcart/#" className="checkout-btn">Checkout</a>
                </div>
            </div>
        </div>
    </div>
    }
}
