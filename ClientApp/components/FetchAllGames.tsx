import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';

interface FetchAllGamesState {
    games: Models.Game[];
    loading: boolean;
}

export class FetchAllGames extends React.Component<RouteComponentProps<{}>, FetchAllGamesState> {
    constructor() {
        super();
        this.state = { games: [], loading: true };

        fetch('Game/GetAll')
            .then(response => response.json() as Promise<Models.Game[]>)
            .then(data => {
                this.setState({ games: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchAllGames.renderGame(this.state.games);

        return <div>
                <div className="col-lg-1"></div>
                <div className="col-lg-8">
                <h2>Bestsellers</h2>
                { contents }
                </div>
        </div>;
    }
    private static renderGame(games: Models.Game[]) {
        return <div>
            {games.map(game =>
                <div className="product"  key={ game.id }>
                <Link to={"/game/" + game.id}>
                            <div className="col-lg-3">
                                <img height="150" width="150"  src={game.image} /> 
                            </div>
                        <div className="col-lg-9">
                            <div className="product-info">

                                <ul>
                                    <li className="title">{ game.title }</li>
                                    <li className="category">Categorie : { game.category.name }</li>     
                                    <li className="prijs">Price: &euro; { game.price }</li>                                   
                                    <li className="platform">Platform : { game.platform.name }</li>
                                    <li className="description">{ game.description.substring(0, 200) }</li>
                                </ul>
                            
                            </div>
                        
                    </div>
                </Link>
                </div>
            )}
        </div>;
    }
}

