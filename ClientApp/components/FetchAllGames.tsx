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

        return <div className="col-md-10 content">
                    <h2>Bestsellers</h2>
                    { contents }
                </div>;
    }
    private static renderGame(games: Models.Game[]) {
        return <div>
            {games.map(game =>
                <div className="row product" key={ game.id }>
                <Link to={"/game/" + game.id}>
                    <div className="row">
                        <div className="col-sm-3">
                            <img className="img-thumbnail" src={game.image} />
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="title">{ game.title }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Categorie: </span><span className="category">{ game.category.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Price: </span><span className="price">&euro; { game.price.toFixed(2) }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Platform: </span><span className="platform">{ game.platform.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="description">
                                        { game.description.substring(0, 250) }...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                </div>
            )}
        </div>;
    }
}

