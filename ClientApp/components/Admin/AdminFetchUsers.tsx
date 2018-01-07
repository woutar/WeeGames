import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'isomorphic-fetch';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

interface FetchAllUsersState {
    users: Models.User[];
    loading: boolean;
    sortName: undefined;
    sortOrder: undefined;
    mode: any;
    cellEdit: any;
}

export class AdminFetchUsers extends React.Component<RouteComponentProps<any>, FetchAllUsersState>{
    constructor(props: undefined) {
        super(props);
        this.state = { users: [], 
                    loading: true, 
                    sortName: undefined,  
                    sortOrder: undefined,
                    mode: 'checkbox',
                    cellEdit: 'click',
                };


        fetch('api/user/getall')
            .then(response => response.json() as Promise<Models.User[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    onSortChange(sortName: any, sortOrder: any){
        this.setState({
            sortName,
            sortOrder
        });
    }

    onAfterDeleteRow(rowKeys: any) {
        fetch('api/user/deleteuser',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rowKeys)
            
        })        
    }

    onAfterSaveCell(row: any, cellName: any, cellValue: any) {
        // alert(`Save cell ${cellName} with value ${cellValue}`);

        var userInfo = [];
        for (const prop in row) {
          userInfo.push(row[prop]);
        }

        // Send user info to updateuser method in usercontroller
        fetch('api/user/updateuser',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: userInfo[0],
                Email: userInfo[1],
                Firstname: userInfo[3],
                Lastname: userInfo[4],
                Address: userInfo[6],
                Zipcode: userInfo[7]
            })
        });
    }
      
    onBeforeSaveCell(row: any, cellName: any, cellValue: any) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
    }


    ImageFormatter(cell: any, row: any){
        return <a href={"admin/updateuser/" + row.id}><img src='./images/edit.png' width='20' height='20'></img></a>;
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
            
        <BootstrapTable data={ this.state.users } selectRow={ selectRowProp } deleteRow={ true } cellEdit={ cellEditProp } search={true}  options={ options} height='auto' hover pagination>
            <TableHeaderColumn dataField='id'isKey={true} width="60">ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstname' dataSort>Firstname</TableHeaderColumn>
            <TableHeaderColumn dataField='lastname'  dataSort>Lastname</TableHeaderColumn>
            <TableHeaderColumn dataField='email'  dataSort>Email address</TableHeaderColumn>
            <TableHeaderColumn dataField='birthdate' dataSort editable={ false }>Birthdate</TableHeaderColumn>
            <TableHeaderColumn dataField='address' >Address</TableHeaderColumn>
            <TableHeaderColumn dataField='zipcode' >zipcode</TableHeaderColumn>
            <TableHeaderColumn dataField='country'  dataSort editable={ false }>Country</TableHeaderColumn>
            <TableHeaderColumn dataField='id' dataFormat={this.ImageFormatter} editable={ false } width="80">Update</TableHeaderColumn>
        </BootstrapTable>

        </div>;
    }

}
