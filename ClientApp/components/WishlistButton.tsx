import * as React from 'react';
import * as Models from "../Model";
import { Wishlist } from '../Model';

interface WishlistButtonState{
    auth_user : Models.User,
    isInWishlist : boolean
}

export class WishlistButton extends React.Component<{game_id : number}, WishlistButtonState> {
    constructor(props:any){
        super(props);

        // check if the user is logged in
        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);

            // fetch the game from wishlists
            let user_id = this.state.auth_user.id;
            fetch('api/Wishlist/GetWishlist',{
                method : 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserId : user_id,
                    GameId : this.props.game_id
                })
            })    
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                this.setState({ isInWishlist: data, auth_user: auth_user });
            });
        }
    }

    public render(){
        if(sessionStorage.getItem("user") != null){
            if(this.state.isInWishlist){
                return <button type="submit" className="btn btn-warning">Add to wistlist <i className="glyphicon glyphicon-heart-full"></i></button>
            }else{
                return <button type="submit" className="btn btn-warning">Add to wistlist <i className="glyphicon glyphicon-heart-empty"></i></button>
            }
        }else{
            return <a href="login"><button type="submit" className="btn btn-warning">Add to wistlist <i className="glyphicon glyphicon-heart-empty"></i></button></a>
        }
    }
}