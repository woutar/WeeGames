import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';

interface FetchPlatformGamesState{
    games: Models.Game[];
    loading: boolean;
    platformname: string;
}


export class FetchPlatformGames extends React.Component<RouteComponentProps<{platform : string}>, FetchPlatformGamesState>{
    constructor(props:RouteComponentProps<{platform:string}>){
        super(props);
        this.state = {games: [], loading: true, platformname: this.props.match.params.platform}

        let searchquery = this.props.match.params.platform;

        fetch('api/platform/GetGames/' + searchquery)
            .then (response => response.json() as Promise<Models.Game[]>)
            .then(data=> {
                this.setState({ games: data, loading: false });
            });

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchPlatformGames.renderGame(this.state.games);

        return <div>
                <div className="col-lg-1"></div>
                <div className="col-lg-8">
                <h2>{this.state.platformname}</h2>
                { contents }
                </div>
        </div>;
    }

    componentDidUpdate(){
        let searchquery = this.props.match.params.platform;

        fetch('api/platform/GetGames/' + searchquery)
            .then (response => response.json() as Promise<Models.Game[]>)
            .then(data=> {
                this.setState({ games: data, loading: false, platformname: this.props.match.params.platform });
            });
            
    }

    private static renderGame(games: Models.Game[]) {
        return <div>
            {games.map(game =>
                <div className="product"  key={ game.title }>
                <Link to={"/game/" + game.id}>
                    <div className="col-lg-3">
                        <img height="150" width="150"  src={game.image} /> 
                    </div>
                    <div className="col-lg-9">
                        <div className="product-info">
                            <ul>
                                <li className="title">{ game.title }</li>
                                <li className="genre">{ game.category }</li>
                                <li className="prijs">Price: &euro; { game.price },-</li>                                   
                                <li className="platform">{ game.platform }</li>
                                <li className="description">{ game.description }</li>
                            </ul>
                        </div>
                    </div>
                </Link>
                </div>
            )}
        </div>;
    }
}