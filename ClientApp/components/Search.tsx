import * as React from 'react';
import { render } from 'react-dom'

interface SearchProps{}
interface SearchState{searchString: string, finalString: string}


    export class Search extends React.Component<SearchProps,SearchState> {
        constructor(props: any){
            super(props);

            this.state = {searchString: '', finalString: ''}
  
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(event: any){
            this.setState({
                searchString: event.target.value,
                finalString: "Search/" + this.state.searchString
            })
        }


      render() {
        return (
            <form action={this.state.finalString} onSubmit={this.handleChange}>
                <li className="search">
                    <input type="text" value={this.state.searchString} onChange={this.handleChange}  />
                    <input type="submit" value="Submit" />
                </li>
                {this.state.finalString}
            </form>
        )
    }
}