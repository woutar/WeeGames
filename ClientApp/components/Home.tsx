import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="container">
    <div className="col-lg-2">
        <div id="platform" className="sidebar">
            <h3>Platform</h3>
            <ul>
                <li><a href="pcgames.html">PC Games</a></li>
                <li><a href="#">PSP Games</a></li>
                <li><a href="#">Playstation 1</a></li>
                <li><a href="#">Playstation 2</a></li>
                <li><a href="#">Playstation 3</a></li>
                <li><a href="ps4games.html">Playstation 4</a></li>
                <li><a href="#">NES Games</a></li>
                <li><a href="#">Nintendo Wii</a></li>
                <li><a href="#">XBOX 360</a></li>
                <li><a href="#">Nintendo DS</a></li>
                <li><a href="#">Nintendo 64</a></li>
                <li><a href="#">Gameboy</a></li>
                <li><a href="#">Consoles</a></li>
            </ul>
        </div>
    </div>
    </div>;
    }
}
