import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Login } from './Login';
import { OrderOverview} from './OrderOverview';
import * as Models from "../Model"

interface CheckoutInfoState{
    ShippingInfo : Models.ShippingInfo | Models.User,
    FilledForm : boolean
}

export class Checkout extends React.Component<RouteComponentProps<{}>,CheckoutInfoState> {
    constructor() {
        super();

        let stored_user = sessionStorage.getItem("user");
        if(stored_user != null){
            this.state = {
                ShippingInfo : JSON.parse(stored_user),
                FilledForm : false
            }
        }else{
            this.state = {ShippingInfo : {
                email : '',
                firstname : '',
                lastname : '',
                address : '',
                zipcode : '',
                country : 'Netherlands'
            },
            FilledForm : false
        };
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onInfoFormSumbit = this.onInfoFormSumbit.bind(this);
    }

    handleInputChange(event : any){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            ShippingInfo: {
                ...prevState.ShippingInfo,
                [name] : value
            }
        }))
    }

    onInfoFormSumbit(event : any){
        event.preventDefault();
        this.setState({
            FilledForm : true
        })
    }

    public render() {
        if(sessionStorage.getItem("user")){
            return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={true}/>
        }else if(this.state.FilledForm){
            return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={false}/>
        }
        else{
            return this.renderNotAuthForm();
        }
    }

    renderNotAuthForm(){
        return <div>
            <div className="row">
                <div className="col-lg-6 checkout-left">
                    <div className="col-lg-10">
                        <h2 className="customer">
                            I'm an existing user
                        </h2>
                        <br/>
                        <Login location={"checkout"}/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="customer">
                                I'm a new customer
                            </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <br/>
                            <span>I'd like to register and continue the order</span><br />
                            <span className="checkout-info">
                                Registered users can save their delivery details and view their order history.
                            </span><br/><br/>
                            <input type="submit" className="btn checkout-btn btn-warning btn-md pull-right" value="Continue"/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                            <span>I'd like to order without registering</span><br /><br/>
                            <input type="submit" className="btn checkout-btn btn-warning btn-md pull-right" value="Continue"/>
                        </div>
                    </div>

                    {/* <form onSubmit={this.onInfoFormSumbit}>
                        <div className="col-md-4 col-md-offset-4 button-margin-top">
                            <input type="submit" className="btn checkout-btn btn-warning btn-md"  value="Continue"/>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
    }
}