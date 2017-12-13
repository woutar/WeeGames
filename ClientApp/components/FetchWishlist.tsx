import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';
// import { Game } from './FetchGame';

interface WishlistState{
    user_id: string;
    game_id: string;
    loading: boolean;
    wishlist_items: WishlistTable[];

}

export class FetchWishlist extends React.Component<RouteComponentProps<{}>, WishlistState>{
    constructor(props:RouteComponentProps<{}>){
        super(props);
        this.state = {user_id:"", game_id:"", loading: true, wishlist_items:[]}

        fetch('api/platform/GetGames/')
        .then (response => response.json() as Promise<WishlistTable[]>)
        .then(data=> {
            this.setState({ user_id: '', game_id : ''});
        });

            }; 

        
        
    public render() {
                let contents = this.state.loading
                    ? <p><em>Loading...</em></p>
                    : FetchWishlist.renderWishlistTable(this.state.wishlist_items);
        
                return <div>
                    <h1>Weather forecast</h1>
                    <p>This component demonstrates fetching data from the server.</p>
                    { contents }
                </div>;
            }
        
            private static renderWishlistTable(wishlist_items: WishlistTable[]) {
                return <table className='table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                    {wishlist_items.map(forecast =>
                        <tr key={ forecast.dateFormatted }>
                            <td>{ forecast.dateFormatted }</td>
                            <td>{ forecast.temperatureC }</td>
                            <td>{ forecast.temperatureF }</td>
                            <td>{ forecast.summary }</td>
                        </tr>
                    )}
                    </tbody>
                </table>;
            }
        }

        interface WishlistTable {
            dateFormatted: string;
            temperatureC: number;
            temperatureF: number;
            summary: string;
        }
        
}   

