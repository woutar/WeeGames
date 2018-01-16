import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import * as Models from "../Model";
import 'isomorphic-fetch';

interface FetchAllGamesState {
    games: Models.Game[]
    loading: boolean
    amount : number
    categories : Models.Category[]
    activeCategory : string
    pageOfItems : Models.Game[]
}

export class FetchAllGames extends React.Component<RouteComponentProps<{}>, FetchAllGamesState> {
    constructor() {
        super();
        this.state = { games: [], loading: true, amount: 0, categories: [], activeCategory : 'Choose category', pageOfItems : [] };
        
        fetch('Game/GetAll')
            .then(response => response.json() as Promise<Models.Game[]>)
            .then(data => {
                this.setState({ games: data, loading: false });
            });

        fetch('api/Category/GetAll')
            .then(response => response.json() as Promise<Models.Category[]>)
            .then(data => {
                this.setState({ categories: data });
            });

        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        
    }

    onChangePage(pageOfItems : any) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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
        event.preventDefault();

        fetch('Game/Filter/' + 'none/' + this.state.activeCategory + '/' + this.state.amount)
        .then(response => response.json() as Promise<Models.Game[]>)
        .then(data => {
            this.setState({ games: data, loading: false });
            console.log(this.state.pageOfItems)
        });

        // Local try for filtering

        // var games = this.state.games;
        // var category = this.state.activeCategory;
        // var amount = this.state.amount;
        // var filtered_games = games.filter(function(currentObject : any){
        //     return currentObject.category.name == category && currentObject.price > amount
        // });
        // console.log(filtered_games)
        // this.setState({ games : filtered_games});
        
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchAllGames.renderGame(this.state.pageOfItems);
        let filters = this.renderFilters();

        return <div className="col-md-10 content">
                    <div className="row pageTitle">
                        <h2>Bestsellers</h2>
                    </div>
                    { filters }
                    { contents }
                    <Pagination items={this.state.games} onChangePage={this.onChangePage} initialPage={1} />
                </div>;
    }

    public renderFilters() {
        return <div className="row centered filter-margin">
                <h4><b>Filters</b></h4>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 centered">
                        <div className="form-group">
                            <label>Category</label>
                            <br/>
                            <select name="activeCategory" id="activeCategory" className="form-control" value={this.state.activeCategory} onChange ={this.handleInputChange}>
                                <option value="Choose category">Choose category</option>
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

    private static renderGame(games: Models.Game[]) {
        if(games.length == 0){
            return <div><h4>No games found matching your search filters</h4></div>
        }
        return <div>
            {games.map(game =>
                <div className="row product" key={ game.id }>
                <Link to={"/game/" + game.id}>
                    <div className="row">
                        <div className="col-sm-3">
                            <img className="img-thumbnail" src={game.image} />
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="title">{ game.title }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Categorie: </span><span className="category">{ game.category.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Price: </span><span className="price">&euro; { game.price.toFixed(2) }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Platform: </span><span className="platform">{ game.platform.name }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="description">
                                        { game.description.substring(0, 250) }...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                </div>
            )}
            
        </div>;
    }
}

