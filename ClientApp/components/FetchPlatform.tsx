import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';

interface FetchPlatformState {
    platforms: Models.Platform[];
    loading: boolean;
}

// export class FetchPlatform extends React.Component<RouteComponentProps<{platform : Models.Platform}>, FetchPlatformState> {
//     constructor(props:{platform:Models.Platform}) {
//         super();
//         this.state = {platforms: [], loading: true };
//         let x = this.props.match.params.platform.id;

//         fetch('api/Platform/GetAll/${x}')
//             .then(response => response.json() as Promise<Models.Platform[]>)
//             .then(data => {
//                 this.setState({ platforms: data, loading: false });
//             });
//     }

//     public render() {
//         if(this.state.loading){
//             <p><em>Loading...</em></p>
//         }
//         return <p>
//             {this.state.platforms.map( platform =>
//                 {platform.name}
//             )}
//         </p>;
//     }
// }

export class Platform extends React.Component<{platform:Models.Platform}, {}> {
    constructor(props:{platform:Models.Platform}){
        super(props)
        this.state = {}
    }

    public render() {
        return <li> {this.props.platform.name} </li>
        
    }
}