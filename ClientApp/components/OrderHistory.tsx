import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model";

interface OrderHistoryState{
    auth_user : Models.User,
    orders : Models.Order[],
    loading : boolean,
    activeOrder : Models.Order | null
}

export class OrderHistory extends React.Component<RouteComponentProps<{}>,OrderHistoryState> {
    constructor() {
        super();

        // check if the user is logged in
        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);
            this.state ={auth_user : auth_user, orders : [], loading : true, activeOrder : null};

            // fetch the orders
            let user_id = this.state.auth_user.id;
            fetch('api/Order/GetOrders/' + user_id)
            .then(response => response.json() as Promise<Models.Order[]>)
            .then(data => {
                this.setState({ orders: data, loading: false });
            });
        }

        this.onDetails = this.onDetails.bind(this);
        this.onHistory = this.onHistory.bind(this);

    }
    public render() {
        if(sessionStorage.getItem("user") == null){
            window.location.href = "login";
        }

        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderOrders();

        let message;
        if(this.state.orders.length == 0){
            message = <div className="pageTitle"><h2>You haven't ordered yet</h2></div>
        }else{
            message = <div className="pageTitle"><h2>Order history</h2></div>
        }


        if(this.state.activeOrder != null){
            return this.renderOrderDetail();
        }else{
            return <div className="row">
                <div className="col-md-10 col-md-offset-1 content">
                    {message}
                    {contents}
                </div>
            </div>
        }
    }

    onDetails(event : any, order: Models.Order){
        event.preventDefault();
        this.setState({
            activeOrder : order
        })
    }

    onHistory(event : any){
        event.preventDefault();
        this.setState({
            activeOrder : null
        })
    }

    renderOrders(){
        // var date = parseDate(this.state.activeOrder.orderDate);
        
        // function to make the date a correct Date type
        function parseDate(input : any) {
            var parts = input.match(/(\d+)/g);
            // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
            return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
        }

        // convert the date to a nice string format
        // var dd = date.getDate();
        // var mm = date.getMonth()+1; 
        // var yyyy = date.getFullYear();
        // var pretty_date = yyyy + "-" + mm + "-" + dd;

        return <div>
        {this.state.orders.map(order =>
            <div className="row product history-item" key={ order.id } onClick={() => this.onDetails(event,order)}>
                <div className="row">
                    <div className="col-sm-3">
                        <span className="title">Ordernumber : { order.id }</span>
                    </div>
                    <div className="col-sm-3">
                        <span className="">Date: { parseDate(order.orderDate).getFullYear() + "-" + parseDate(order.orderDate).getMonth() + "-" + parseDate(order.orderDate).getDate() }</span>
                    </div>
                    <div className="col-sm-3">
                        <span className="price">Price : &euro;{ order.total.toFixed(2) }</span>
                    </div>
                    <div className="col-sm-3 ">
                        <span className="status">Status : {order.status}</span>
                    </div>
                </div>
            </div>
        )}
        </div>   
    }

    renderOrderDetail(){
        if(this.state.activeOrder != null){

            //store the date object
            var date = parseDate(this.state.activeOrder.orderDate);

            // function to make the date a correct Date type
            function parseDate(input : any) {
                var parts = input.match(/(\d+)/g);
                // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
                return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
            }

            // convert the date to a nice string format
            var dd = date.getDate();
            var mm = date.getMonth()+1; 
            var yyyy = date.getFullYear();
            var pretty_date = yyyy + "-" + mm + "-" + dd;
            
            return <div className="row">
            <div className="col-md-5 content">
                <h2>Order details</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <span><b>Ordernumber:</b> {this.state.activeOrder.id}</span>
                    </div>
                    <div className="col-sm-12">
                        <span><b>Orderdate:</b> {pretty_date}</span>
                    </div>
                    <div className="col-sm-12">
                        <span><b>Payment method:</b> {this.state.activeOrder.paymentMethod}</span>
                    </div>
                    <div className="col-sm-12">
                        <span><b>Payment details:</b> {this.state.activeOrder.methodInfo}</span>
                    </div>
                    <div className="col-sm-12">
                        <span><b>Order status:</b> {this.state.activeOrder.status}</span>
                    </div>
                </div> 
                <div className="col-md-12 button-margin-top">
                    <button type="button" className="btn checkout-btn btn-warning btn-md btn-block" onClick={this.onHistory}>Back to order history</button>
                </div>  
            </div>
            <div className="col-lg-1" />
            <div className="col-md-5 content">
                <h2>Ordered items</h2>
                    {this.state.activeOrder.orderItems.map(orderitem =>
                        <div className="row product" key={ orderitem.id }>
                            <div className="row">
                                <div className="col-sm-3">
                                    <img className="img-thumbnail small-img" src={orderitem.game.image} />
                                </div>
                                <div className="col-sm-6">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span className="title">{ orderitem.game.title }</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span>{ orderitem.game.platform.name }</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span> Amount: { orderitem.quantity }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span className="price"> &euro; { (orderitem.game.price * orderitem.quantity).toFixed(2) }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                <h3>Total &euro; {this.state.activeOrder.total.toFixed(2)}</h3>
            </div>
        </div>
        }else{
            return null;
        }
    }
}