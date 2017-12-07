import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';
import {FetchPlatformGames} from "./FetchPlatformGames"

interface FetchAllPlatformsState {
    platforms: Models.Platform[];
    loading: boolean;
}

export class FetchAllPlatforms extends React.Component<RouteComponentProps<{}>, FetchAllPlatformsState> {
    constructor() {
        super();
        this.state = { platforms: [], loading: true };

        fetch('api/Platform/GetAll')
            .then(response => response.json() as Promise<Models.Platform[]>)
            .then(data => {
                this.setState({ platforms: data, loading: false });
            });
    }

    
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchAllPlatforms.renderPlatforms(this, this.state.platforms);

        return <div className="col-md-2 sidebar">
                    { contents }
                    
                </div>;
    }

    private static renderPlatforms(self:any, platforms: Models.Platform[]) {
        return <ul className="nav nav-pills nav-stacked">
            {platforms.map(platform =>
                <li  key={ platform.name }>
                    <a href={"/games/" + platform.name}>
                        { platform.name }
                    </a>
                </li>
            )}
            </ul>;
    }
}

