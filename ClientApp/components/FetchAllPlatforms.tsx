import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';
import {FetchPlatformGames} from "./FetchPlatformGames"

interface FetchAllPlatformsState {
    platforms: Models.Platform[];
    loading: boolean;
    activeItem : string;
}

export class FetchAllPlatforms extends React.Component<RouteComponentProps<{platform : string}>, FetchAllPlatformsState> {
    constructor(props:RouteComponentProps<{platform:string}>){
        super(props);
        this.state = { platforms: [], loading: true, activeItem : this.props.match.params.platform };

        fetch('api/Platform/GetAll')
            .then(response => response.json() as Promise<Models.Platform[]>)
            .then(data => {
                this.setState({ platforms: data, loading: false });
            });
    }

    
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPlatforms(this.state.platforms);

        return <div className="col-md-2 sidebar">
                <div className="row pageTitle">
                    </div>
                    { contents }
                </div>
    }

    renderActive(platform : string){
        if(this.state.activeItem == platform){
            return "nav-active";
        }else{
            return undefined;
        }
    }

    renderPlatforms(platforms: Models.Platform[]) {
        return <ul className="nav nav-pills nav-stacked">
            {platforms.map(platform =>
                <li  key={ platform.name }>
                    <a href={"/games/" + platform.name} className={this.renderActive(platform.name)}>
                        { platform.name }
                    </a>
                </li>
            )}
            </ul>;
    }
}

