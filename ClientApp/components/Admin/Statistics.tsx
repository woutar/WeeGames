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
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#home">Top 10 Genres</a></li>
                    <li><a data-toggle="tab" href="#menu1">Top 10 Visited</a></li>
                    <li><a data-toggle="tab" href="#menu2">Sales this month</a></li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <BarChart/>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                        <PieChart/>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                        <LineChart/>
                    </div>
                </div>
            </div>;
        }
}