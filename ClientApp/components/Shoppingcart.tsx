import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Imaget } from './Imaget';

interface ProductInformation {
    name: string;
    platform: string;
    genre: string;
    quantity: number;
    price: number;
    image_url: string;
    subtotal: number;
    grandtotal: number;
}

export class Shoppingcart extends React.Component<RouteComponentProps<{}>, ProductInformation> {
    constructor() {
        super();
        this.state = { 
            name: 'Battlefield 1',
            platform: 'Playstation 4',
            genre: 'Shooter',
            quantity: 1,
            price: 59.99,
            image_url: 'placeholder',
            subtotal: 59.99,
            grandtotal: 0
        };
    }

    public update( e : any){
        this.setState({grandtotal: this.state.grandtotal + this.state.subtotal})
    }

    public render() {
return <div>
    <h2>Shoppingcart</h2>
    <div className="product product-001">
            <a href="product_info_1.html">
                <div className="col-lg-3">
                    <Imaget/>
                </div>
                <div className="col-lg-9">
                    <div className="product-info">
                        <ul>
                            <li className="title">{this.state.name}</li>
                            <li className="prijs">Price: &euro;{this.state.price}</li>
                            <li className="genre">Genre: {this.state.genre}</li>
                            <li className="platform">Platform: {this.state.platform}</li>
                            <li className="quantity">Quantity: {this.state.quantity}</li>
                            <li className="subtotal">Subtotal: &euro;{this.state.subtotal}</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
        <div className="checkout-wrapper">
            <div className="total">Grandtotal: €{this.state.grandtotal}</div>
            <a href="contactdetails.html"><div className="cart-button checkout-button" id="cart-button">Checkout</div></a>
        </div>
    </div>;
    }

}
