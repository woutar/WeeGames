import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';


    export class Imaget extends React.Component {

      
      render() {
        return (
          <div>
            <div className="spongebob">
             <img className="sponge" src={require('./images/placeholder150x150.png')} /> 
            </div>
          </div>
        )
      }
    }