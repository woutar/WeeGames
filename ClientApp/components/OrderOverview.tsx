import * as React from 'react';
import * as Models from "../Model";
import { SortOrder } from 'react-bootstrap-table';

interface OrderState{
    games : Models.ShoppingcartGame[],
    total : number,
    paymentmethod : string,
    bank : string,
    creditcardnumb : number | null,
    ordercreated : boolean
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
            this.state = {games: inventory_games, total : total, paymentmethod : 'Ideal', bank: 'Rabobank', creditcardnumb : null, ordercreated : false};
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event : any){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event : any){
        event.preventDefault();

        // define method info to insert into DB
        var methodinfo : string;
        if(this.state.paymentmethod === 'Creditcard' && this.state.creditcardnumb != null){
            methodinfo = this.state.creditcardnumb.toString();
        }else{
            methodinfo = this.state.bank;
        }   

        // making a json array for OrderItems
        var orderitems : any = [];
        this.state.games.map(game =>
            orderitems.push({Game : {Id:game.id},Quantity : game.amount})
        )

        fetch('api/Order/AddOrder',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                User : {
                    Id : this.props.ShippingInfo.id
                },
                OrderDate : new Date(),
                Paymentmethod : this.state.paymentmethod,
                Methodinfo : methodinfo,
                Status : "Complete",
                OrderItems : orderitems
            })
        });
        this.setState({ordercreated : true});
        localStorage.removeItem("ShoppingCart");
    }
    

    render(){
        if(this.state.ordercreated){
            return this.renderOrderPlaced();
        }
        
        let payinfo;
        if(this.state.paymentmethod === 'Ideal'){
            payinfo = this.renderInputIdeal();
        }else if(this.state.paymentmethod === 'Creditcard'){
            payinfo = this.renderInputCreditcard();
        }

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
            <div className="col-md-5 content">
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
            <div className="col-lg-5 col-lg-offset-2">
                <h3>Payment method</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="pay-method-wrapper">
                    <label>
                        <input type="radio" value="Ideal" name="paymentmethod" checked={this.state.paymentmethod === 'Ideal'} onChange={this.handleChange} />
                        <img className="pay-method-img" src='/images/ideal.gif' />
                    </label>
                    </div>
                    <div className="pay-method-wrapper">
                    <label>
                        <input type="radio" value="Creditcard" name="paymentmethod" checked={this.state.paymentmethod === 'Creditcard'} onChange={this.handleChange} />
                        <img className="pay-method-img" src='/images/creditcard.ico' />
                    </label>
                    </div>
                        {payinfo}
                    <div className="col-md-12 button-margin-top">
                        <input type="submit" className="btn checkout-btn btn-warning btn-md btn-block"  value="Confirm transaction"/>
                    </div>
                </form>
            </div>
        </div>
    }

    renderInputIdeal(){
        return <div className="row">
                <div className="col-lg-12">
                <label>Bank</label>
                    <select name="bank" id="bank" className="form-control" value={this.state.bank} onChange ={this.handleChange}>
                        <option value="Rabobank">Rabobank</option>
                        <option value="ING">ING</option>
                        <option value="ABN Amro">ABN Amro</option>
                        <option value="Triodos Bank">Triodos bank</option>
                        <option value="SNS Bank">SNS Bank</option>
                        <option value="ASN Bank">ASN Bank</option>
                        <option value="Regio Bank">Regio Bank</option>
                        <option value="Knab">Knab</option>
                    </select>
                </div>
        </div>
    }

    renderInputCreditcard(){
        return <div className="row">
            <div className="col-lg-12">
                <label>Card number (16 digits)</label>
                <input name="creditcardnumb" type="text" className="form-control"  placeholder="5299640000000000" required
                onChange ={this.handleChange} pattern="^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$"/>
            </div>
    </div>
    }

    renderOrderPlaced(){
        let userlink;
        if(this.props.ShippingInfo.id != 0){
            userlink = <h4>You can also view your order in your <a href="/">order history</a></h4>;
        }
        return <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                <h2><b>Thank you for ordering from WeeGames!</b></h2>
                <br></br>
                <br></br>
                <br></br>
                <h4>We will process the order and you will receive a confirmation of your order on <b>{this.props.ShippingInfo.email}</b></h4>
                {userlink}
                </div>
        </div>
    }
}