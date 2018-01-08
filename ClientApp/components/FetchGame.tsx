import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { WishlistButton } from './WishlistButton';
import * as Models from "../Model"

interface FetchGameState {
    game: Models.Game | '';
    loading: boolean;
}

export class FetchGame extends React.Component<RouteComponentProps<{id:number}>, FetchGameState> {
    constructor(props:RouteComponentProps<{id:number}>){
        super(props);
        this.state = {game: '', loading: true };

        let id = this.props.match.params.id;
        fetch('Game/GetGame/' + id)
            .then(response => response.json() as Promise<Models.Game>)
            .then(data => {
                this.setState({ game: data, loading: false });
            });
    }

    public render() {
        if(this.state.loading) return <div> Loading </div>
        if(this.state.game == '') return <div> Something went wrong </div>
        return <Game  game={this.state.game}/>
    }
}

type GameProps = {game:Models.Game}
export class Game extends React.Component<GameProps, {amount : number, cartgame : Models.ShoppingcartGame, showPopup : boolean}> {
    constructor(props:GameProps){
      super(props)
      let shoppincartgame = JSON.parse(JSON.stringify(this.props.game));
      shoppincartgame['amount'] = 1;
      this.state = {amount : 1, cartgame : shoppincartgame, showPopup : false}

      this.AddToCart = this.AddToCart.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addAmount = this.addAmount.bind(this);
      this.removeAmount = this.removeAmount.bind(this);
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    handleChange(event : any){
        if(event.target.value > 0 && event.target.value < 100){
            this.setState({
                amount : event.target.value
            })
        }
    }

    addAmount(){
        if(this.state.amount < 99){
            this.setState({
                amount : + this.state.amount + 1           
            })
        }
    }

    removeAmount(){
        if(this.state.amount > 1){
            this.setState({
                amount : this.state.amount - 1
            })
        }
    }

    AddToCart(){
        var arr : any = [];
        var OldCart = localStorage.getItem("ShoppingCart");
        this.state.cartgame.amount = this.state.amount;
        if(OldCart === null){
            arr.push(this.state.cartgame)
            localStorage.setItem("ShoppingCart", JSON.stringify(arr));
        }else{
            arr = JSON.parse(OldCart);
            var cartgame = this.state.cartgame;
            let newgame = true;
            arr = arr.filter(function(currentObject : any){
                if (currentObject.id == cartgame.id){
                    newgame = false;
                    let newamount = currentObject.amount = + currentObject.amount + cartgame.amount; 
                    if(newamount < 100){
                        return currentObject.amount = newamount;  
                    }else{
                        return currentObject.amount = 99;
                    }
                }else{
                    return true;
                }
            });
            if(newgame){
                arr.push(this.state.cartgame)
                newgame = false;
            }
            localStorage.setItem("ShoppingCart", JSON.stringify(arr));
        }
        // popup after adding item
        this.togglePopup();
    }

    public render(){
        return <div className="col-lg-10">
                    <div className="pageTitle"><h2>{this.props.game.title} - {this.props.game.platform.name}</h2></div>
                    <div className="col-lg-4">
                        <img height="300" width="300" src={this.props.game.image}/>
                    </div>
                    <div className="col-lg-8">
                        <div className="info-price">
                            <h4>Category: {this.props.game.category.name}</h4>
                            <h4>Publisher: {this.props.game.publisher}</h4>
                            <h4>Release year: {this.props.game.releasedate}</h4>
                            <WishlistButton game_id={this.props.game.id}/>

                            <hr />
                            <h4>€ {this.props.game.price.toFixed(2)}</h4>
                            <br/>
                            <button type="button" className="btn btn-danger btn-minus" onClick={this.removeAmount}>-</button>
                            <input type="number" max="999" min="1" className="amount" value={this.state.amount} onChange={this.handleChange}/>
                            <button type="button" className="btn btn-success btn-plus" onClick={this.addAmount}>+</button>
                            <button type="button" onClick={this.AddToCart} className="btn btn-default buy-button">Add to Cart</button>
                            <br></br>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <h3>Description</h3>
                        <p>{this.props.game.description}</p>
                    </div>
                    {this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)} game={this.props.game} amount={this.state.amount}/>: null}
                </div>;
    }
}

class Popup extends React.Component<{closePopup : any, game : Models.Game, amount : number},{}>{
    ToShoppingcart(){
        window.location.href = "shoppingcart";
    }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <div className="row">
                <div className="col-sm-10 col-sm-offset-1"> 
                    <h3>Item(s) added to your shoppingcart</h3>
                    <br></br>
                    <div className="col-sm-5 col-sm-offset-1">
                        <img className="img-thumbnail" src={this.props.game.image}/>
                    </div>
                    <div className="col-sm-6">
                    <br></br>
                        <h5>Title: {this.props.game.title}</h5>
                        <h5>Platform: {this.props.game.platform.name}</h5>
                        <h5>Category: {this.props.game.category.name}</h5>
                        <h5>Publisher: {this.props.game.publisher}</h5>
                        <h5>Release year: {this.props.game.releasedate}</h5>
                        <h5>Amount: {this.props.amount}</h5>
                    </div>
                </div>
            </div>
            <div className="row top-margin-buttons">
                <div className="col-sm-10 col-sm-offset-1"> 
                    <div className="col-sm-6 centered">
                        <button type="button" onClick={this.props.closePopup} className="btn btn-warning">Continue shopping</button>
                    </div>
                    <div className="col-sm-6 centered">
                        <button type="button" onClick={this.ToShoppingcart} className="btn btn-warning">To shoppingcart</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      );
    }
}