import * as React from 'react';
import { render } from 'react-dom'


    export class Imaget extends React.Component {

      render() {
        return (
          <div>
            <div className="spongebob">
            <img className="sponge" src={require('./img/sponge.png')} />
            </div>
          </div>
        )
      }
    }