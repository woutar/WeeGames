import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Login } from './Login';
import { OrderOverview} from './OrderOverview';
import * as Models from "../Model"

interface CheckoutInfoState{
    ShippingInfo : Models.ShippingInfo | Models.User
}

export class Checkout extends React.Component<RouteComponentProps<{}>,CheckoutInfoState> {
    constructor() {
        super();

        let stored_user = sessionStorage.getItem("user");
        if(stored_user != null){
            this.state = {
                ShippingInfo : JSON.parse(stored_user)
            }
        }else{
            this.state = {ShippingInfo : {
                email : '',
                firstname : '',
                lastname : '',
                address : '',
                zipcode : '',
                country : 'Netherlands'
            }};
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

    onInfoFormSumbit(){
        return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={false}/>
    }

    public render() {
        if(sessionStorage.getItem("user")){
            return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={true}/>
        }else{
            return this.renderNotAuthForm();
        }
    }

    renderNotAuthForm(){
        return <div>
            <div className="row">
                <div className="col-lg-4">
                <Login/>
                </div>
                <div className="col-lg-2" />
                <div className="col-lg-5">
                    <h2>Enter contact information</h2>
                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" id="email" type="email" className="form-control" placeholder="Example@example.com" required 
                            minLength={10} maxLength={64} onChange ={this.handleInputChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$"/>
                        </div>
                        <div className="form-group">
                            <label>Firstname</label>
                            <input name="firstname" id="firstname" type="text" className="form-control"  placeholder="Enter Firstname" required 
                            onChange ={this.handleInputChange} maxLength={30}/>
                        </div>
                        <div className="form-group">
                            <label>Lastname</label>
                            <input name="lastname" id="lastname" type="text" className="form-control"  placeholder="Enter Lastname" required
                            onChange ={this.handleInputChange} maxLength={30}/>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input name="address" id="address" type="text" className="form-control"  placeholder="Enter Address" required
                            onChange ={this.handleInputChange} minLength={10} maxLength={50}/>
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input name="zipcode" id="Zipcode" type="text" className="form-control"  placeholder="0000AA" required
                            onChange ={this.handleInputChange} pattern= "[0-9]{4}[A-Z]{2}"/>
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <br/>
                            <select name="country" id="country" className="form-control" value={this.state.ShippingInfo.country} onChange ={this.handleInputChange}>
                                <option value="Netherlands">Netherlands</option>
                                <option value="France">France</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Germany">Germany</option>
                                <option value="Belgium">Belgium</option>
                            </select>
                        </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <button type="button" className="btn checkout-btn btn-warning btn-md btn-block" onClick={this.onInfoFormSumbit}>Checkout</button>
                </div>
            </div>
        </div>
    }
}