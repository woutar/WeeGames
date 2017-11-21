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
export class Game extends React.Component<GameProps, {}> {
    constructor(props:GameProps){
      super(props)
      this.state = {}

      this.AddToCart = this.AddToCart.bind(this);
    }

    AddToCart(): void{
        var arr = [];
        var OldCart = localStorage.getItem("ShoppingCart");
        if(OldCart === null){
            arr.push(this.props.game)
            localStorage.setItem("ShoppingCart", JSON.stringify(arr));
        }else{
            arr = JSON.parse(OldCart);
            arr.push(this.props.game);
            localStorage.setItem("ShoppingCart", JSON.stringify(arr));
            console.log(JSON.parse(arr));
        }
        
    }

    public render(){
        return <div className="col-lg-10">
                    <h2>{this.props.game.title} - {this.props.game.platform.name}</h2>
                    <div className="col-lg-6">
                        <img src="/images/placeholder400x200.png"/>
                    </div>
                    <div className="col-lg-6">
                        <h4>Category: {this.props.game.category.name}</h4>
                    </div>
                    <div className="col-lg-12">
                
                        <h3>Description</h3>
                        <p>{this.props.game.description}</p>
                
                        <div className="info-price">
                            <div className="price">€ {this.props.game.price}</div>
                            <button className="cart-button" onClick={ this.AddToCart }>Add to Cart</button>
                        </div>
                    </div>
                </div>;
    }
}