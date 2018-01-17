import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model"

interface UpdateGameState{
    Id: number;
    Title: string;
    CategoryId: number;
    Price: number;
    PlatformId: number;
    Description: string;
    Releasedate: number;
    Publisher: string;
    Image: string;
}

export class UpdateGame extends React.Component<RouteComponentProps<{id: number}>, UpdateGameState>{
    constructor(props :any){
        super(props);

        this.state ={
            Id: 0,
            Title: '',
            CategoryId: 0,
            Price: 0,
            PlatformId: 0,
            Description: '',
            Releasedate: 0,
            Publisher: '',
            Image: '',
        };

        let id = this.props.match.params.id;
        fetch('Game/GetGame/' + id)
            .then(response => response.json() as Promise<Models.Game>)
            .then(data => {
                this.setState({
                     Id: data.id,
                     Title: data.title,
                     CategoryId: data.category.id,
                     Price: data.price,
                     PlatformId: data.platform.id,
                     Description: data.description,
                     Releasedate: data.releasedate,
                     Publisher: data.publisher,
                     Image: data.image,
                    });
            });

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
        event.preventDefault();

        if(this.state.Image == null){
            this.setState({Image: ''});
        }

        fetch('Game/UpdateFullGame',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.Id,
                Title: this.state.Title,
                CategoryId: this.state.CategoryId,
                Price: this.state.Price,
                PlatformId: this.state.PlatformId,
                Description: this.state.Description,
                Releasedate: this.state.Releasedate,
                Publisher: this.state.Publisher,
                Image: this.state.Image,
            })
            
        })
        .then(response => response.json() as Promise<Models.Game>); 
        window.location.href = "/admin/games";     
    }

    
    render() {
        return (
            <div className="row">
                <form method="post" onSubmit={this.handleSubmit}>
                <div className="col-lg-1"/>
                <div className="col-lg-6">
                    <h2>Update game</h2>
                    <div className="form-group">
                        <label>Game title</label>
                        <input name="Title" type="text" className="form-control" placeholder="Game title" required 
                         maxLength={64} onChange ={this.handleInputChange} value={this.state.Title} />
                    </div>
    
                    <div className="form-group">
                        <label>Platform</label>
                        <br/>
                        <select name="PlatformId" className="form-control" value={this.state.PlatformId}  onChange ={this.handleInputChange} required>
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
                        <select name="CategoryId"  className="form-control" value={this.state.CategoryId}  onChange ={this.handleInputChange} required>
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
                        <input name="Price" type="number" className="form-control" value={this.state.Price} placeholder="€00.00" required step="0.01" 
                         maxLength={10} onChange ={this.handleInputChange} />
                    </div>
    
                    <div className="form-group">
                        <label>Publisher</label>
                        <input name="Publisher" type="text" className="form-control" value={this.state.Publisher} placeholder="Publisher" 
                         maxLength={64} onChange ={this.handleInputChange} />
                    </div>
    
                    <div className="form-group">
                        <label>Release year</label>
                        <input name="Releasedate" type="number" className="form-control" value={this.state.Releasedate} placeholder="Release year" 
                         maxLength={4} min="1950" max="2018" onChange ={this.handleInputChange} />
                    </div>
    
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea className="form-control" rows={5} name="Description" placeholder="Game description" value={this.state.Description} onChange ={this.handleInputChange}></textarea>
                    </div>
    
                    {/* <input type="file" name="pic" accept="image/*"/> */}
                    <br/>
                    <input type="submit" className="btn btn-default" value="Update Game"/>
                </div>
                </form>
            </div>
            );
    }
}