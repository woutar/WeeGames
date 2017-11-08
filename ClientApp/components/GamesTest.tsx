import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface GameTestExampleState {
    gamelist: GameList[];
    loading: boolean;
}

// TSX model games - Needs own file
interface GameList {
    game: string;
    genre: string;
    price: number;
    platform : string;
}

export class GamesTest extends React.Component<RouteComponentProps<{}>, GameTestExampleState> {
    constructor() {
        super();
        this.state = { gamelist: [], loading: true };

        fetch('api/TestGame/GameList')
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
                <a href="/">
                        <div className="col-lg-3">
                            <div className="product-image"></div>
                        </div>
                    <div className="col-lg-9">
                        <div className="product-info">
                        
                            { /*  Key must change to ID later*/}
                            <ul  key={ gamelistitem.price }>
                                <li className="title">{ gamelistitem.game }</li>
                                <li className="prijs">Price: &euro; { gamelistitem.price },-</li>
                                <li className="genre">{ gamelistitem.genre }</li>
                                <li className="platform">{ gamelistitem.platform }</li>
                                <li className="description">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta justo id erat bibendum,
                                                            a convallis justo elementum. Sed at magna sem. Nullam sed ultrices est. Aliquam luctus pretium quam et scelerisque.
                                                            Nullam in est tristique, facilisis enim vel, sodales lectus. In a vulputate lectus, et scelerisque tellus. Vivamus
                                                            non nisi accumsan, volutpat urna quis, pretium lacus. Fusce sagittis suscipit sapien, et porttitor ipsum fermentum et.</li>
                            </ul>
                        
                        </div>
                    </div>
                </a>
            </div>
        )}
        </div>;
    }
}

