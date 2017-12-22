import * as React from 'react';
import * as Models from "../Model";

type OrderProps = {
    order: Models.Order
}

export class OrderHistoryDetails extends React.Component<OrderProps, {}> {
    constructor(props:any){
        super(props);
    }

    public render(){
        return <div className="row">
                <div className="col-md-10 col-md-offset-1 content">
                    <h2>Order Details</h2>
                    
                    
                </div>
            </div>
    }
}