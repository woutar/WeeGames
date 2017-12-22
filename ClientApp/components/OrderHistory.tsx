import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import { OrderHistoryDetails } from './OrderHistoryDetails';

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

        this.OnorderClick = this.OnorderClick.bind(this);

    }
    public render() {
        if(sessionStorage.getItem("user") == null){
            window.location.href = "/";
        }

        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderOrders();

        if(this.state.activeOrder != null){
            return <OrderHistoryDetails order={this.state.activeOrder}/>
        }else{
            return <div className="row">
                <div className="col-md-10 col-md-offset-1 content">
                    <h2>Order history</h2>
                    {contents}
                </div>
            </div>
        }
    }

    OnorderClick(event : any, order: Models.Order){
        event.preventDefault();
        this.setState({
            activeOrder : order
        })
    }

    renderOrders(){
        return <div>
        {this.state.orders.map(order =>
            <div className="row product" key={ order.id } onClick={() => this.OnorderClick(event,order)}>
                <div className="row">
                    <div className="col-sm-6">
                        <span className="title">Ordernumber : { order.id }</span>
                    </div>
                    <div className="col-sm-3 col-sm-offset-3">
                        <span className="status">Status : {order.status}</span>
                    </div>
                </div>
            </div>
        )}
        </div>   
    }
}