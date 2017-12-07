import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'isomorphic-fetch';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

interface FetchAllGamesState {
    games: Models.Game[];
    loading: boolean;
    sortName: undefined;
    sortOrder: undefined;


}

export class AdminFetchGames extends React.Component<RouteComponentProps<any>, FetchAllGamesState>{
    constructor(props: undefined) {
        super(props);
        this.state = { games: [], 
                    loading: true, 
                    sortName: undefined,  
                    sortOrder: undefined
                };


        fetch('Game/GetAll')
            .then(response => response.json() as Promise<Models.Game[]>)
            .then(data => {
                this.setState({ games: data, loading: false });
            });
    }

    onSortChange(sortName: any, sortOrder: any){
        this.setState({
            sortName,
            sortOrder
        });
        
    }

    public render() {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
          };

        return <div>
            
        <BootstrapTable data={ this.state.games }  options={ options} hover condensed height='800' scrollTop={ 'Bottom' }>
            <TableHeaderColumn dataField='id' dataSort isKey width="125">Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='title' dataSort filter={ { type: 'TextFilter', delay: 500 } }>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='platform' dataSort width="140">Platform</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort width="155"
             filter={ { 
                type: 'NumberFilter', 
                delay: 1000, 
                numberComparators: [ '=', '>', '<=' ]
              } }
            >Product Price</TableHeaderColumn>
            <TableHeaderColumn dataField='publisher' dataSort filter={ { type: 'TextFilter', delay: 500 } }>Publisher</TableHeaderColumn>

        </BootstrapTable>

        </div>;
    }

}

