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
        if(localStorage.getItem("ShoppingCart") == null){
            return <div className="col-md-10 content text-center">
            <h2>Shopping cart</h2>
                <div className="empty-cart-big"></div>
                <span>You don't have any items in your cart</span>
                <hr />
                <a href="shoppingcart/#" className="pull-center"><button type="button" className="btn btn-warning btn-lg">Continue shopping</button></a>
            </div>
        }
        return <div className="col-md-10 content">
        <h2>Shoppingcart</h2>
        {this.state.games.map(game =>
            <div className="row product" key={ game.id }>
                <Link to={"/game/" + game.id}>
                    <div className="row">
                        <div className="col-sm-3">
                            <img className="img-thumbnail" src={game.image} />
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
                                    <span className="tag">Price: </span><span className="price">&euro; { game.price.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Amount: </span><span className="price">{ game.amount }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Subtotal: </span><span className="price">&euro; { (game.amount * game.price).toFixed(2) }</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Link>
                </div>
        )}

        <div className="checkout-wrapper">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="checkout-info"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <a href="/" className="checkout-btn"><button type="button" className="btn btn-warning btn-md btn-block">Continue shopping</button></a>
                        </div>
                    </div>
                </div> 
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="checkout-info">
                                <span className="pull-left">Grandtotal:</span>
                                <span className="pull-right">&euro; {Math.round(this.state.total * 100) / 100} </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <a href="/shoppingcart/#" className="checkout-btn"><button type="button" className="btn btn-warning btn-md btn-block">Checkout</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
}
