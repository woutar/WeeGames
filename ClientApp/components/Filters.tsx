import * as React from 'react';
import * as Models from "../Model"

interface FilterState {
    amount : number
    categories : Models.Category[]
    activeCategory : string
}

export class Filters extends React.Component<{}, FilterState> {
    constructor() {
        super();
        this.state = { amount: 0, categories: [], activeCategory : 'Choose category' };
        
        fetch('api/Category/GetAll')
            .then(response => response.json() as Promise<Models.Category[]>)
            .then(data => {
                this.setState({ categories: data });
            });

        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handlePriceChange(event : any){
        if(event.target.value >= 0 && event.target.value <= 1000){
            this.setState({
                amount : event.target.value
            })
        }
    }

    handleInputChange(event : any){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event : any){
        
    }

    public render() {
        return <div className="row centered filter-margin">
                <h4><b>Filters</b></h4>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 centered">
                        <div className="form-group">
                            <label>Category</label>
                            <br/>
                            <select name="activeCategory" id="activeCategory" className="form-control" value={this.state.activeCategory} onChange ={this.handleInputChange}>
                                <option value={this.state.activeCategory}>{this.state.activeCategory}</option>
                                {this.state.categories.map(categorie =>
                                    <option value={categorie.name}>{categorie.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 centered">
                        <div className="form-group">
                            <label>Minimal price &euro; &nbsp;</label>
                            <input type="number" max="999" min="0" className="form-control" value={this.state.amount} onChange={this.handlePriceChange}/>
                        </div>
                    </div>
                    <div className="col-md-12 centered">
                        <input type="submit" className="btn btn-default" value="Filter"/>
                    </div>
                </form>
        </div>
    }
}