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
        fetch('game/deletegame',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rowKeys)
            
        })        
    }

    onAfterSaveCell(row: any, cellName: any, cellValue: any) {

        var gameInfo = [];
        for (const prop in row) {
          gameInfo.push(row[prop]);
        }
        // Change , to . in Price
        // gameInfo[2] = gameInfo[2].replace(/,/g, '.');

        // Send game info to updategame method in gamecontroller
        fetch('game/updategame',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: gameInfo[0],
                Title: gameInfo[1],
                Price: gameInfo[2],
                Description: gameInfo[3],
                Releasedate: gameInfo[9],
                Publisher: gameInfo[10],
            })
        });
    }
      
    onBeforeSaveCell(row: any, cellName: any, cellValue: any) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
    }

    CategoryPlatformFormatter(cell: any, row: any){
        return `${cell.name}`
    }

    ImageFormatter(cell: any, row: any){
        return <a href={"admin/updategame/" + row.id}><img src='./images/edit.png' width='20' height='20'></img></a>;
    }
  

    public render() {
        var user = sessionStorage.getItem("user")
        if( user != null){
            var user_json = JSON.parse(user);
            if(user_json.role == 1){
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
                    <TableHeaderColumn dataField='id'isKey={true} width="60">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title' dataSort width="160">Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='platform' dataFormat={this.CategoryPlatformFormatter} editable={ false } dataSort>Platform</TableHeaderColumn>
                    <TableHeaderColumn dataField='category' dataFormat={this.CategoryPlatformFormatter} editable={ false } dataSort>Category</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort 
                    filter={ { 
                        type: 'NumberFilter', 
                        delay: 1000, 
                        numberComparators: ['<=', '>']
                    } }
                    >Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='publisher' dataSort>Publisher</TableHeaderColumn>
                    <TableHeaderColumn dataField='releasedate' dataSort width="120">Release Year</TableHeaderColumn>
                    <TableHeaderColumn dataField='id' dataFormat={this.ImageFormatter} editable={ false } width="80">Update</TableHeaderColumn>
                </BootstrapTable>

                </div>;
            }
            return null
        }
        return null
    }

}
