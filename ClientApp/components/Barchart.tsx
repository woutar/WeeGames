import * as React from 'react';
import {Bar} from 'react-chartjs-2';

interface BarChartState{
    barchartData: any
}


export class BarChart extends React.Component<{},BarChartState>{
    constructor(props:any){
        super(props);
        this.state = {
            barchartData:{}
        }
    }

    static defaultProps ={
        displayLegend: false,
        legendPosition: 'right'
    }

    componentWillMount(){
        this.getBarChartData();
    }

    getBarChartData(){
        //Ajax calls here

        fetch('api/statistics/getordersamount')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                this.setState({ 
                    barchartData:{
                        labels: ['Total orders','Guest orders','Registered orders'],
                        datasets:[
                            {
                                label:['Units Sold'],
                                data: data,
                                min: 0,
                              backgroundColor:[
                                  'rgba(255, 0, 0, 0.6)',
                                  'rgba(125, 125, 142, 0.6)',
                                  'rgba(255, 146, 0, 0.6)',                
                              ]
                            }
                          ]}
                });
            });
      }

    
    render(){
        return (
            <div className="chart">
                <Bar data={this.state.barchartData}
                     options={{
                         scales:{
                            yAxes: [{
                                ticks: { 
                                    min: 0
                                }
                            }]
                         },
                         title:{
                             display:true,
                             text:'Order information',
                             fontSize:25
                         },
                     }}
                     />
            </div>
        )
    }
}
