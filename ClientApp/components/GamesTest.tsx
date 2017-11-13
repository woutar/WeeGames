import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import 'isomorphic-fetch';

interface GameTestExampleState {
    gamelist: GameList[];
    loading: boolean;
}

// TSX model games - Needs own file
interface GameList {
    id : number;
    game: string;
    genre: string;
    price: number;
    platform : string;
    description : string;
}

export class GamesTest extends React.Component<RouteComponentProps<{}>, GameTestExampleState> {
    constructor() {
        super();
        this.state = { gamelist: [], loading: true };

        fetch('api/TestGame/GetAll')
            .then(response => response.json() as Promise<GameList[]>)
            .then(data => {
                this.setState({ gamelist: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : GamesTest.renderGameList(this.state.gamelist);

        return <div>
                <h2>Bestsellers</h2>
                { contents }
        </div>;
    }

    private static renderGameList(gamelist: GameList[]) {
        return <div>
        {gamelist.map(gamelistitem =>
            <div className="product" key={ gamelistitem.game }>
            <Link to={"/game/" + gamelistitem.id}>
                <a href="/">
                        <div className="col-lg-3">
                            <div className="product-image"></div>
                        </div>
                    <div className="col-lg-9">
                        <div className="product-info">
                        
                            { /*  Key must change to ID later*/}
                            <ul  key={ gamelistitem.id }>
                                <li className="title">{ gamelistitem.game }</li>
                                <li className="prijs">Price: &euro; { gamelistitem.price },-</li>
                                <li className="genre">{ gamelistitem.genre }</li>
                                <li className="platform">{ gamelistitem.platform }</li>
                                <li className="description">{ gamelistitem.description }</li>
                            </ul>
                        
                        </div>
                    </div>
                </a>
            </Link>
            </div>
        )}
        </div>;
    }
}

