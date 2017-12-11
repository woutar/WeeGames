import * as React from 'react';
import {Line} from 'react-chartjs-2';

interface LineChartState{
    linechartData: any
}


export class LineChart extends React.Component<{},LineChartState>{
    constructor(props:any){
        super(props);
        this.state = {
            linechartData:{}
        }
    }

    static defaultProps ={
        displayLegend: false,
        legendPosition: 'right'
    }

    componentWillMount(){
        this.getLineChartData();
    }

    getLineChartData(){
        //Ajax calls here
        this.setState({
          linechartData:{
            labels: ['Game 1','Game 2','Game 3','Game 4','Game 5','Game 6','Game 7','Game 8','Game 9','Game 10'],
            datasets:[
                {
                    label:'Units Sold',
                    data:[
                        111123,547386,
                        222422,635036,
                        333343,239424,
                        444444,539638,
                        549035,5235252 
                    ],
                    backgroundColor:[
                        'rgba(255, 0, 0, 0.6)','rgba(125, 125, 142, 0.6)',
                        'rgba(255, 146, 0, 0.6)','rgba(0, 255, 207, 0.6)',
                        'rgba(255, 224, 0, 0.6)','rgba(0, 157, 255, 0.6)',
                        'rgba(136, 255, 0, 0.6)','rgba(21, 0, 255, 0.6)',
                        'rgba(255, 0, 166, 0.6)','rgba(175, 0, 255, 0.6)',                 
                    ]
                }
              ]}
        })
      }
      
    render(){
        return (
            <div className="chart">
                <Line data={this.state.linechartData}
                     options={{
                         title:{
                             display:true,
                             text:'Top 10 Visited Genres',
                             fontSize:25
                         },
                     }}
                     />
            </div>
        )
    }
    getBarChartData(){
        //Ajax calls here
        this.setState({
          linechartData:{
            labels: ['Game 1','Game 2','Game 3','Game 4','Game 5','Game 6','Game 7','Game 8','Game 9','Game 10'],
            datasets:[
                {
                    label:'Units Sold',
                    data:[
                      111123,547386,
                      222422,635036,
                      333343,239424,
                      444444,539638,
                      549035,5235252 
                  ],
                  backgroundColor:[
                      'rgba(255, 0, 0, 0.6)','rgba(125, 125, 142, 0.6)',
                      'rgba(255, 146, 0, 0.6)','rgba(0, 255, 207, 0.6)',
                      'rgba(255, 224, 0, 0.6)','rgba(0, 157, 255, 0.6)',
                      'rgba(136, 255, 0, 0.6)','rgba(21, 0, 255, 0.6)',
                      'rgba(255, 0, 166, 0.6)','rgba(175, 0, 255, 0.6)',                 
                  ]
                }
              ]}
        })
      }
}