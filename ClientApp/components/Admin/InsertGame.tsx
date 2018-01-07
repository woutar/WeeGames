import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model";


interface PostGameState {
    Title: string;
    CategoryId: number;
    Price: number;
    PlatformId: number;
    Description: string;
    Releasedate: number;
    Publisher: string;
    Image: string;
}

export class InsertGame extends React.Component<RouteComponentProps<{}>,PostGameState>{
    constructor(props :any){
        super(props);

        this.state ={
            Title: '',
            CategoryId: 0,
            Price: 0,
            PlatformId: 0,
            Description: 'This game has no description.',
            Releasedate: 0,
            Publisher: '',
            Image: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        fetch('Game/AddGame',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Title: this.state.Title,
                CategoryId: this.state.CategoryId,
                Price: this.state.Price,
                PlatformId: this.state.PlatformId,
                Description: this.state.Description,
                Releasedate: this.state.Releasedate,
                Publisher: this.state.Publisher,
            })
        })
        .then(response => response.json() as Promise<Models.Game>)
        .then(data => {
            this.gameCreated();
        });
        
    }
    
    handleImage(){
        var form = document.forms.namedItem("FileInfo");

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "")
    }

     gameCreated(){
        alert("Game created");
    }

    render() {
        return (
        <div className="row">
        <form method="post" name="FileInfo" action="#" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div className="col-lg-1"/>
            <div className="col-lg-6">
                <h2>Create game</h2>
                <div className="form-group">
                    <label>Game title</label>
                    <input name="Title" type="text" className="form-control" placeholder="Game title" required 
                     maxLength={64} onChange ={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Platform</label>
                    <br/>
                    <select name="PlatformId" className="form-control"  onChange ={this.handleInputChange} required>
                        <option value="">Pick a platform</option>
                        <option value="1">PC</option>
                        <option value="2">Playstation</option>
                        <option value="3">Playstation 2</option>
                        <option value="4">Playstation 3</option>
                        <option value="5">Playstation 4</option>
                        <option value="6">Xbox</option>
                        <option value="7">Xbox 360</option>
                        <option value="8">Xbox One</option>
                        <option value="9">Gameboy</option>
                        <option value="10">Gameboy Advanced</option>
                        <option value="11">PSP</option>
                        <option value="12">Nintendo DS</option>
                        <option value="13">Nintendo 3DS</option>
                        <option value="14">Nintendo Wii</option>
                        <option value="15">Nintendo WiiU</option>
                    </select>
                </div>
 
                <div className="form-group">
                    <label>Category</label>
                    <br/>
                    <select name="CategoryId"  className="form-control"  onChange ={this.handleInputChange} required>
                        <option value="">Pick a category</option>
                        <option value="1">Action</option>
                        <option value="2">Adventure</option>
                        <option value="3">Fighting</option>
                        <option value="4">Misc</option>
                        <option value="5">Platformer</option>
                        <option value="6">Puzzle</option>
                        <option value="7">Racing</option>
                        <option value="8">Role-Playing</option>
                        <option value="9">Shooter</option>
                        <option value="10">Simulation</option>
                        <option value="11">Sports</option>
                        <option value="12">Strategy</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input name="Price" type="number" className="form-control" placeholder="€00.00" required step="0.01" 
                     maxLength={10} onChange ={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Publisher</label>
                    <input name="Publisher" type="text" className="form-control" placeholder="Publisher" 
                     maxLength={64} onChange ={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Release year</label>
                    <input name="Releasedate" type="number" className="form-control" placeholder="Release year" 
                     maxLength={4} min="1950" max="2017" onChange ={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Comment:</label>
                    <textarea className="form-control" rows={5} name="Description" placeholder="Game description" onChange ={this.handleInputChange}>This game has no description.</textarea>
                </div>

                <input type="file" name="pic" accept="image/*"/>
                <br/>
                <input type="submit" className="btn btn-default" value="Add Game"/>
            </div>
            </form>
        </div>
        );
    }
}
