import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as Models from "../Model"
import 'isomorphic-fetch';

interface ProductInformation {
    games: Models.Game[];
    loading: boolean;
    id: number;
}

export class Product extends React.Component<RouteComponentProps<{}>, ProductInformation> {
    constructor() {
        super();
        
        
                
                fetch('api/TestGame/GetGame1')
                    .then(response => response.json() as Promise<Models.Game[]>)
                    .then(data => {
                        this.setState({ games: data, loading: false });
                    });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Productpage loading...</em></p>
            : Product.renderGame(this.state.games);

        return <div>
                <div className="col-lg-1"></div>
                <div className="col-lg-8">
                { contents }
                </div>
        </div>;
    }

    private static renderGame(game: Models.Game[]) {
        return <div>
        {game.map(game =>
            <div className="product">
                <h2>{game.title} - {game.platform}</h2>
                <div className="col-lg-7">
                
                    {/* Dont know how to make this variable atm 
                    The image is set in the index.css file*/}
                    <img className="productpage-image"/>
                </div>

                <div className="col-lg-1"></div>

                <div className="col-lg-4 info-right">
                    <h4>System Requirements</h4>
                    <div className="reqs">
                        <p>SYSTEM REQ NIET IN DB</p>
                    </div>

                    <div className="rating-wrapper">
                        <h5>Rating</h5>
                        <div className="rating">
                            <p>GAME RATING NIET IN DB</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">

                    <h3>Description</h3>
                    <p>{game.description}</p>

                    <div className="info-price">
                        <div className="price">€ {game.price}</div>
                        <span className="amount">
                            Amount
                            <img src="../css/images/minus_2.png" className="ch-am minus" />
                            <input type="text" value="0"/>
                            <img src="../css/images/plus_2.png" className="ch-am plus" />
                        </span>
                        <br/>
                        <div className="cart-button" id="cart-button">Add to cart</div>
                    </div>
                </div>

                {/* Buy confirmation screen */}
                <div className="buy-window" id="buy-window">
                    <div className="title">Item added to shopping cart.</div>
                    <img className="img" src="css/images/placeholder150x150.png"/>
                    <div className="button-wrapper">
                        <a href="index.html"><div className="button" id="return-button">Continue shopping</div></a>
                        <a href="shopping-cart.html" className="button button-right" id="to-cart-button">Go to shopping cart</a>
                    </div>
                </div>
            </div>)}
        </div>; 
    }
}
