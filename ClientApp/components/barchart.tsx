import * as React from 'react';
import { render } from 'react-dom';
// import 'victory';
import { VictoryPie } from 'victory';
import { Router, Route, Switch } from 'react-router'

import { RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"

export default class PieChart extends React.Component<RouteComponentProps<{}>>  {
  render() {
    return (
      <VictoryPie />
    );
  }
}

//render(<PieChart />, document.getElementById('app'));