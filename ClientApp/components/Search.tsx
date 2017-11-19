import * as React from 'react';
import { render } from 'react-dom'


    export class Search extends React.Component {
        constructor(){
            super();
            this.state = {
                search: ''
            };
        }


      render() {
        return (
            <form method="post" action="#">
                <li className="search">
                    <input type="text" />
                    <input type="submit" value="Search" />
                </li>
            </form>
        )
    }
}