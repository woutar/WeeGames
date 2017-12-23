import * as React from 'react';
import * as Models from "../Model";
import { Wishlist } from '../Model';

type isInWishlist = {
    status : boolean
}

interface WishlistButtonState{
    auth_user : Models.User,
    isInWishlist : isInWishlist
}

export class WishlistButton extends React.Component<{game_id : number}, WishlistButtonState> {
    constructor(props:any){
        super(props);

        // check if the user is logged in
        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);
            this.state ={auth_user : auth_user, isInWishlist : {status : false}}


            
            // check if the user has the game in its wishlist
            let user_id = this.state.auth_user.id;
            fetch('api/Wishlist/CheckWishlist',{
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
            .then(response => response.json() as Promise<isInWishlist>)
            .then(response => {
                this.setState({ isInWishlist : response});
            });
            
        }
        this.AddToWishlist = this.AddToWishlist.bind(this);
        this.RemoveFromWishlist = this.RemoveFromWishlist.bind(this);
    }

    AddToWishlist(event : any){
        event.preventDefault();

        // add the game to wishlists
        let user_id = this.state.auth_user.id;

        fetch('api/Wishlist/AddtoWishlist',{
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
        .then(response => response.json() as Promise<isInWishlist>)
        .then(response => {
            this.setState({ isInWishlist : response});
        });
    }

    RemoveFromWishlist(event : any){
        event.preventDefault();

        // add the game to wishlists
        let user_id = this.state.auth_user.id;

        fetch('api/Wishlist/DeleteFromWishlist',{
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
        .then(response => response.json() as Promise<isInWishlist>)
        .then(response => {
            this.setState({ isInWishlist : response});
        });
    }



    public render(){
        if(sessionStorage.getItem("user") != null){
            if(this.state.isInWishlist.status){
                return <button type="submit" className="btn btn-warning" onClick={this.RemoveFromWishlist}>Remove from wistlist <i className="glyphicon glyphicon-heart"></i></button>
            }else{
                return <button type="submit" className="btn btn-warning" onClick={this.AddToWishlist}>Add to wistlist <i className="glyphicon glyphicon-heart-empty"></i></button>
            }
        }else{
            return <a href="login"><button type="submit" className="btn btn-warning">Add to wistlist <i className="glyphicon glyphicon-heart-empty"></i></button></a>
        }
    }
}