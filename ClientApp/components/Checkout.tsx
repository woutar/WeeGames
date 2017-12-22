import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { OrderOverview} from './OrderOverview';
import * as Models from "../Model"

interface CheckoutInfoState{
    ShippingInfo : Models.ShippingInfo | Models.User,
    FilledForm : boolean,
    AsNewUser : boolean,
    AsGuest : boolean
}

export class Checkout extends React.Component<RouteComponentProps<{}>, CheckoutInfoState> {
    constructor() {
        super();

        let stored_user = sessionStorage.getItem("user");
        if(stored_user != null){
            this.state = {
                ShippingInfo : JSON.parse(stored_user),
                FilledForm : false,
                AsNewUser : false,
                AsGuest : false
            }
        }else{
            this.state = {ShippingInfo : {
                id : null,
                email : '',
                firstname : '',
                lastname : '',
                address : '',
                city : '',
                zipcode : '',
                country : 'Netherlands'
            },
            FilledForm : false,
            AsNewUser : false,
            AsGuest : false
        };
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onInfoFormSumbit = this.onInfoFormSumbit.bind(this);
        this.onNewRegister = this.onNewRegister.bind(this);
        this.onGuest = this.onGuest.bind(this);
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

    onNewRegister(event : any){
        event.preventDefault();
        this.setState({
            AsNewUser : true
        })
    }

    onGuest(event : any){
        event.preventDefault();
        this.setState({
            AsGuest : true
        })
    }

    public render() {
        if(sessionStorage.getItem("user")){
            return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={true}/>
        }else if(this.state.FilledForm){
            return <OrderOverview ShippingInfo={this.state.ShippingInfo} IsLoggedIn={false}/>
        }else if(this.state.AsNewUser){
            return <div className="row">
            <h2>Register &amp; Checkout</h2>
                <Register location={"checkout"}/>
            </div>
        }else if(this.state.AsGuest){
            return this.renderGuestForm();
        }
        else{
            return this.renderNotAuth();
        }
    }

    renderNotAuth(){
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
                            <button type="button" className="btn checkout-btn btn-warning btn-md pull-right" onClick={this.onNewRegister}>Continue</button>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <hr />
                            <span>I'd like to order without registering</span><br /><br/>
                            <button type="button" className="btn checkout-btn btn-warning btn-md pull-right" onClick={this.onGuest}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    renderGuestForm(){
        return <div className="row">
            <form onSubmit={this.onInfoFormSumbit}>
                     <div className="col-lg-6 col-lg-offset-3">
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
                                <input name="address" id="address" type="text" className="form-control"  placeholder="Harborstreet 23" required
                                onChange ={this.handleInputChange} minLength={5} maxLength={50}/>
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input name="city" id="city" type="text" className="form-control"  placeholder="London" required
                                onChange ={this.handleInputChange} minLength={2} maxLength={50}/>
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
                                   <option value="United Kingdom">United Kingdom</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Belgium">Belgium</option>
                               </select>
                           </div>
                   </div>
                    <br></br>
                   <br></br>
                    <div className="col-md-4 col-md-offset-4 button-margin-top">
                       <input type="submit" className="btn checkout-btn btn-warning btn-md btn-block"  value="Checkout"/>
                    </div>
                </form>
        </div>
    }
}