import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Router, Route, Switch } from 'react-router'

import { RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
  export default class Main extends React.Component<RouteComponentProps<{}>>  {
    render() {
      return (
        <div>
          <h1>Victory Tutorial</h1>
          <VictoryChart
            domainPadding={10}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x={"quarter"}
              y={"earnings"}
            />
          </VictoryChart>
        </div>
      );
    }
  }
  
//   const app = document.getElementById('app');
//   ReactDOM.render( {}null, app);