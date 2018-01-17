import * as React from 'react';
import {Pie} from 'react-chartjs-2';
import * as Models from "../Model"

interface PieChartState{
    piechartData: any
    orderItems: Models.OrderItem[]
}


export class PieChart extends React.Component<{},PieChartState>{
    constructor(props:any){
        super(props);
        this.state = {
            piechartData:{},
            orderItems: [],
        }

        this.getPieChartData();
    }

    static defaultProps ={
        displayLegend: false,
        legendPosition: 'right'
    }

    getPieChartData(){
        //Ajax calls here
        fetch('api/Statistics/getbestsellersvalue')
        .then(response => response.json() as Promise<Models.OrderItem[]>)
        .then(data => {

        this.setState({
            orderItems: data,
        });

        this.getData();
        });
      }

    getData(){

        var gameTitles = [];
        for(var i = 0; i < 10; i++){
            gameTitles.push(this.state.orderItems[i].game.id);
        }
        var json = JSON.stringify(gameTitles);

        fetch('api/statistics/getgametitles',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: json
  
        })
        .then(response => response.json() as Promise<string[]>)
        .then(data => {
            var amount = []
            for(var i = 0; i < 10; i++){
                amount.push(this.state.orderItems[i].quantity);
            }
            this.setState({ piechartData:{
                labels: data,
                datasets:[{
                    data: amount,
                    label:'Units Sold',
                    backgroundColor:[
                        'rgba(255, 0, 0, 0.6)','rgba(125, 125, 142, 0.6)',
                        'rgba(255, 146, 0, 0.6)','rgba(0, 255, 207, 0.6)',
                        'rgba(255, 224, 0, 0.6)','rgba(0, 157, 255, 0.6)',
                        'rgba(136, 255, 0, 0.6)','rgba(21, 0, 255, 0.6)',
                        'rgba(255, 0, 166, 0.6)','rgba(175, 0, 255, 0.6)',                 
                    ]
                }]
                
            }});
        });
    }
      
    render(){
        return (
            <div className="chart">
                <Pie data={this.state.piechartData}
                     options={{
                         title:{
                             display:true,
                             text:'Top 10 most sold games',
                             fontSize:25
                         },
                     }}
                     />
            </div>
        )
    }
}