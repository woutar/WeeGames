import * as React from 'react';
import * as Models from "../Model";
import { SortOrder } from 'react-bootstrap-table';

interface OrderState{
    games : Models.ShoppingcartGame[],
    total : number
}

type OrderProps = {
    ShippingInfo: Models.ShippingInfo | Models.User,
    IsLoggedIn : boolean
}

export class OrderOverview extends React.Component<OrderProps, OrderState> {
    constructor(props:any){
        super(props);

        // Reading the shoppingcart and defining price total
        let stored_games = localStorage.getItem("ShoppingCart")
        if(stored_games != null){
            let inventory_games = JSON.parse(stored_games);

            var total = 0;
            var i;
            for(i = 0; i < inventory_games.length; i++){
                total += (inventory_games[i].amount * inventory_games[i].price);
            }
            this.state = {games: inventory_games, total : total};
        }

    }

    render(){
        let contents = this.props.IsLoggedIn
        ? this.renderAuthInfo()
        :this.renderNotAuthInfo();

        return <div className="row">
            <div className="col-md-5 content">
                <h2>Order overview</h2>
                    {this.state.games.map(game =>
                        <div className="row product" key={ game.id }>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img className="img-thumbnail small-img" src={game.image} />
                                </div>
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span className="title">{ game.title }</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span>{ game.platform.name }</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span> Amount: { game.amount }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span className="price"> &euro; { (game.price * game.amount).toFixed(2) }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                <h3>Total &euro; {this.state.total.toFixed(2)}</h3>
            </div>
            <div className="col-lg-2" />
                { contents }
        </div>
    }

    renderAuthInfo(){
        return <div className="col-md-5 content">
            <h2>Delivery details</h2>
            <div className="row">
                <div className="col-sm-12">
                    <span><b>Email Address:</b> {this.props.ShippingInfo.email}</span>
                </div>
                <div className="col-sm-12">
                    <span><b>Firstname:</b> {this.props.ShippingInfo.firstname}</span>
                </div>
                <div className="col-sm-12">
                    <span><b>Lastname:</b> {this.props.ShippingInfo.lastname}</span>
                </div>
                <div className="col-sm-12">
                    <span><b>Address:</b> {this.props.ShippingInfo.address}</span>
                </div>
                <div className="col-sm-12">
                    <span><b>Zipcode:</b> {this.props.ShippingInfo.zipcode}</span>
                </div>
                <div className="col-sm-12">
                    <span><b>Country:</b> {this.props.ShippingInfo.country}</span>
                </div>
            </div>   
        </div>
    }

    renderNotAuthInfo(){
        return <div className="col-md-5 content">
            <h2>Delivery details</h2>
            <div className="row">
                <div className="col-sm-12">
                    <span>Email Address: {this.props.ShippingInfo.email}</span>
                </div>
                <div className="col-sm-12">
                    <span>Firstname: {this.props.ShippingInfo.firstname}</span>
                </div>
                <div className="col-sm-12">
                    <span>Lastname: {this.props.ShippingInfo.lastname}</span>
                </div>
                <div className="col-sm-12">
                    <span>Address: {this.props.ShippingInfo.address}</span>
                </div>
                <div className="col-sm-12">
                    <span>Zipcode: {this.props.ShippingInfo.zipcode}</span>
                </div>
                <div className="col-sm-12">
                    <span>Country: {this.props.ShippingInfo.country}</span>
                </div>
            </div>   
        </div>
    }
}