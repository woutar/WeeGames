import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"



export class ShoppingCart extends React.Component<RouteComponentProps<{}>, {games : Models.ShoppingcartGame[], total : number}> {
    constructor(){
        super();
        let stored_games = localStorage.getItem("ShoppingCart")
        if(stored_games != null){
            let inventory_games = JSON.parse(stored_games);

            var total = 0;
            var i;
            for(i = 0; i < inventory_games.length; i++){
                total += (inventory_games[i].amount * inventory_games[i].price);
            }
            
            //set the state equal to the collection of games and total price
            this.state = {games: inventory_games, total : total};
        }    

        //Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.addAmount = this.addAmount.bind(this);
        this.removeAmount = this.removeAmount.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }

    handleChange(event : any, id : number){
        this.updateCart("handleChange", event.target.value, id);
    }

    addAmount(id : number){
        this.updateCart("addAmount", 1, id);
    }

    removeAmount(id : number){
        this.updateCart("removeAmount", 1, id);
    }

    removeFromCart(id: number){
        this.updateCart("removeFromCart", 0, id);
    }

    updateCart(name:string, amount:number, id:number){
        var oldcart = localStorage.getItem("ShoppingCart");
        if(oldcart != null){
            var shoppingcart = JSON.parse(oldcart);
            if(name == "handleChange"){
                shoppingcart = shoppingcart.filter(function(currentObject : any){
                    if (currentObject.id == id && amount > 0 && amount < 100){
                        return currentObject.amount = amount;
                    }else{
                        return true;
                    }
                });
            }
            if(name == "addAmount"){
                shoppingcart = shoppingcart.filter(function(currentObject : any){
                    if (currentObject.id == id && currentObject.amount < 99){
                        return currentObject.amount = + currentObject.amount + 1;
                    }else{
                        return true;
                    }
                });
            }
            if(name == "removeAmount"){
                shoppingcart = shoppingcart.filter(function(currentObject : any){
                    if (currentObject.id == id && currentObject.amount > 1){
                        return currentObject.amount -= amount;
                    }else{
                        return true;
                    }
                });
            }
            if(name == "removeFromCart"){
                shoppingcart = shoppingcart.filter(function(currentObject : any){
                    if (currentObject.id == id){
                        return currentObject.id !== id;
                    }else{
                        return true;
                    }
                });
            }
            if(shoppingcart && shoppingcart.length){
                localStorage.setItem("ShoppingCart", JSON.stringify(shoppingcart));
            }else{
                localStorage.removeItem("ShoppingCart");
            }
            var total = 0;
            var i;
            for(i = 0; i < shoppingcart.length; i++){
                total += (shoppingcart[i].amount * shoppingcart[i].price);
            }
            this.setState({games : shoppingcart, total : total})
        }
    }

    public render() {
        if(localStorage.getItem("ShoppingCart") == null){
            return <div className="col-md-10 content text-center">
                <div className="pageTitle">
                    <h2>Shopping cart</h2>
                </div>
                <div className="empty-cart-big"></div>
                <span>You don't have any items in your cart</span>
                <hr />
                <a href="/" className="pull-center"><button type="button" className="btn btn-warning btn-lg">Continue shopping</button></a>
            </div>
        }
        return <div className="col-md-10 content">
        <h2>Shoppingcart</h2>
        {this.state.games.map(game =>
            <div className="row product" key={ game.id }>
                    <div className="row">
                    <Link to={"/game/" + game.id}>
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
                                    <span className="tag">Subtotal: </span><span className="price">&euro; { (game.amount * game.price).toFixed(2) }</span>
                                </div>
                            </div>    
                            
                        </div>
                        </Link>
                        <div className="col-sm-3 no-left-margin">
                            <br></br>
                            <button type="button" className="btn btn-danger" onClick={e => this.removeAmount(game.id)}>-</button>
                            <input type="number" max="999" min="1" className="amount" value={game.amount} onChange={e => this.handleChange(e,game.id)}/>
                            <button type="button" className="btn btn-success" onClick={e => this.addAmount(game.id)}>+</button>
                            <button type="button" className="btn btn-default buy-button" onClick={e => this.removeFromCart(game.id)}>Remove</button>
                        </div>    
                    </div>
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
                                <span className="pull-right">&euro; {this.state.total.toFixed(2)} </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <a href="/checkout" className="checkout-btn"><button type="button" className="btn btn-warning btn-md btn-block">Checkout</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
}
