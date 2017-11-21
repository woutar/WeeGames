import * as React from 'react';
import { render } from 'react-dom'


    export class Imaget extends React.Component {

      render() {
        return (
          <div>
            <div className="spongebob">
            { <img className="sponge" src={require('./images/placeholder150x150.png')} /> }
            </div>
          </div>
        )
      }
    }