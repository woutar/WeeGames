import { Router, Route, Switch } from 'react-router'
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"

// interface LoginProps{}


export default class Login extends React.Component<RouteComponentProps<{}>> {
    render() {
        return (
            <div>
                <input type="email" value="" />
                <input type="password" value="" />
                <input type="submit" value="Login" />
            </div>
        );
    }
}

function loggedIn() {
    // ...
  }


  
function requireAuth(nextState, replace) {
    if (!loggedIn()) {
      replace({
        pathname: '/login'
      })
    }
  }
  
//   function routes() {
//     return (
//       <Route path="/" component={App}>
//         <Route path="login" component={Login} />
//         <Route path="logout" component={Logout} />
//         <Route path="checkout" component={Checkout} onEnter={requireAuth} />
//       </Route>
//     );
//   }
