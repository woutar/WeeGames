import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"

interface test{
    test: string;
}

export class FetchSearchResult extends React.Component<RouteComponentProps<{searchquery : string}>, test>{
    constructor(props:RouteComponentProps<{searchquery:string}>){
        super(props);
        this.state = {test: ''}

        this.setState({test: this.props.match.params.searchquery });
        // let querystring = this.props.match.params.searchquery;
        alert(this.state.test)

    }

    public render() {
        return <div></div>
    }


}