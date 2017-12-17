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
    mode: any;
    cellEdit: any;
}

export class AdminFetchGames extends React.Component<RouteComponentProps<any>, FetchAllGamesState>{
    constructor(props: undefined) {
        super(props);
        this.state = { games: [], 
                    loading: true, 
                    sortName: undefined,  
                    sortOrder: undefined,
                    mode: 'checkbox',
                    cellEdit: 'click',
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

    onAfterDeleteRow(rowKeys: any) {
        alert('The rowkey you drop: ' + rowKeys);
        
        // fetch('game/deletegame',{
        //     method : 'POST',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         // id : rowKeys
        //     })
            
        // })
        // .then(response => response.json() as Promise<Models.Game>);
        
    }

    onAfterSaveCell(row: any, cellName: any, cellValue: any) {
        alert(`Save cell ${cellName} with value ${cellValue}`);
      
        let rowStr = '';
        for (const prop in row) {
          rowStr += row[prop] + '\n';
        }
      
        alert('The whole row :\n' + rowStr);
      }
      
    onBeforeSaveCell(row: any, cellName: any, cellValue: any) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
    }
  


    public render() {
        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            afterDeleteRow: this.onAfterDeleteRow,  // A hook for after dropping rows.
          };

          const selectRowProp = {
            mode: this.state.mode
          };

          const cellEditProp = {
            mode: this.state.cellEdit,
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
          };


        return <div className="col-md-10 content">
            
        <BootstrapTable data={ this.state.games } selectRow={ selectRowProp } deleteRow={ true } cellEdit={ cellEditProp } search={true}  options={ options} height='auto' hover pagination>
            <TableHeaderColumn dataField='id' dataSort isKey width="125">Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='title' dataSort>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='platform' dataSort width="140">Platform</TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort width="155"
             filter={ { 
                type: 'NumberFilter', 
                delay: 1000, 
                numberComparators: ['<=', '>']
              } }
            >Product Price</TableHeaderColumn>
            <TableHeaderColumn dataField='publisher' dataSort>Publisher</TableHeaderColumn>

        </BootstrapTable>

        </div>;
    }

}
