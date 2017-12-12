import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import {BarChart} from "../Barchart";
import {LineChart} from "../Linechart";
import {PieChart} from "../Piechart";

    export class Statistics extends React.Component<RouteComponentProps<{}>>{
        constructor(props: any){
            super(props);
        }

        
      render() {
        return <div className="col-md-10 content">
                <h2>Statistics</h2>
                <BarChart/>
                    <div className="col-sm-12">  
                        <PieChart/>
                        <LineChart/>
                    </div>
            </div>;
        }
}