import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
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
export class Game extends React.Component<GameProps, {amount : number, cartgame : Models.ShoppingcartGame}> {
    constructor(props:GameProps){
      super(props)
      let shoppincartgame = JSON.parse(JSON.stringify(this.props.game));
      shoppincartgame['amount'] = 1;
      this.state = {amount : 1, cartgame : shoppincartgame}

      this.AddToCart = this.AddToCart.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addAmount = this.addAmount.bind(this);
      this.removeAmount = this.removeAmount.bind(this);
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
        
    }

    public render(){
        return <div className="col-lg-10">
                    <h2>{this.props.game.title} - {this.props.game.platform.name}</h2>
                    <div className="col-lg-6">
                        <img height="300" width="300" src={this.props.game.image}/>
                    </div>
                    <div className="col-lg-6">
                        <h4>Category: {this.props.game.category.name}</h4>
                        <h4>Publisher: {this.props.game.publisher}</h4>
                        <h4>Release year: {this.props.game.releasedate}</h4>
                    </div>
                    <div className="col-lg-12">
                
                    <h3>Description</h3>
                    <p>{this.props.game.description}</p>
                
                        <div className="info-price">
                            <h4>€ {this.props.game.price.toFixed(2)}</h4>
                            <br></br>
                            <button type="button" className="btn btn-danger" onClick={this.removeAmount}>-</button>
                            <input type="number" max="999" min="1" className="amount" value={this.state.amount} onChange={this.handleChange}/>
                            <button type="button" className="btn btn-success" onClick={this.addAmount}>+</button>
                            <br></br>
                            <button type="button" onClick={this.AddToCart} className="btn btn-default buy-button">Add to Cart</button>
                        </div>
                    </div>
                </div>;
    }
}