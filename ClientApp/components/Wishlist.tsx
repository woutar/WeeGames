import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"
import 'isomorphic-fetch';

interface FetchAllGamesState {
    wishlist: Models.Wishlist[],
    loading: boolean,
    auth_user : Models.User
}

export class Wishlist extends React.Component<RouteComponentProps<{}>, FetchAllGamesState> {
    constructor() {
        super();
        
        // check if the user is logged in
        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);
            this.state ={auth_user : auth_user, loading : true, wishlist : []}

            // Get the wishlist of the user
            let user_id = this.state.auth_user.id;
            fetch('api/Wishlist/GetWishlist/' + user_id)
                .then(response => response.json() as Promise<Models.Wishlist[]>)
                .then(data => {
                    this.setState({ wishlist: data, loading: false });
            });
        }
    }

    public render() {
        if(sessionStorage.getItem("user") == null){
            window.location.href = "login";
        }

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderWishlist();

        let message;
        if(this.state.wishlist.length == 0){
            message = <div className="pageTitle"><h2>You don't have items in your wishlist.</h2></div>
        }else{
            message = <div className="pageTitle"><h2>My Wishlist</h2></div>
        }

        return <div className="row">
                <div className="col-md-10 col-md-offset-1 content">
                    {message}
                    {contents}
                </div>
            </div>
    }

    renderWishlist() {
        return <div>
            {this.state.wishlist.map(wishlist =>
                <div className="row product" key={ wishlist.id }>
                <Link to={"/game/" + wishlist.game.id}>
                    <div className="row">
                        <div className="col-sm-2">
                            <img className="img-thumbnail medium-img" src={wishlist.game.image} />
                        </div>
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="title">{ wishlist.game.title }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="tag">Price: </span><span className="price">&euro; { wishlist.game.price.toFixed(2) }</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <span className="description">
                                        { wishlist.game.description.substring(0, 250) }...
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

