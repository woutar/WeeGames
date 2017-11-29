import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';

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
            : FetchAllPlatforms.renderPlatform(this.state.platforms);

        return <div className="col-lg-2">
                <div id="platform" className="sidebar">  
                    <h3>Platform</h3>
                    { contents }
                </div>
        </div>;
    }

    private static renderPlatform(platforms: Models.Platform[]) {
        return <div>
            {platforms.map(platform =>
                 <Link to={"/games/" + platform.name} key={ platform.name }>
                 <ul>
                    <li>{ platform.name }</li>
                </ul> 
                </Link>
            )}
        </div>;
    }
}

