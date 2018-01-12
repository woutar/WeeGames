import * as React from 'react';
import { render } from 'react-dom'

interface SearchProps{}
interface SearchState{searchString: string}


    export class Search extends React.Component<SearchProps,SearchState> {
        constructor(props: any){
            super(props);

            this.state = {searchString: ''}
  
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event: any){
            event.target.value = event.target.value.replace(/[.]/, '');
            this.setState({
                searchString: event.target.value
            })
        }

        handleSubmit(event: any){
            event.preventDefault();
            window.location.href = "/Search/" + this.state.searchString;
        }


      render() {
        return (
            <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" value={this.state.searchString} onChange={this.handleChange} required className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default search-btn"><i className="glyphicon glyphicon-search"></i></button>
            </form>
        )
    }
}