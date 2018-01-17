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

    getLabels(){
        var date = new Date();
        var days = date.getDate();

        date.setDate(days - 30);

        var labelArray = [];

        for(var i = 0; i < 9; i ++){
            date.setDate(date.getDate() + 3)

            labelArray.push(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
        }
        return labelArray;
    }

    getDates(){
        var date = new Date();
        var days = date.getDate();

        date.setDate(days - 30);

        var DateArray = [];

        for(var i = 0; i < 10; i ++){
            date.setDate(date.getDate() + 3)
            DateArray.push(JSON.stringify(date));
        }

        this.setState({
            linechartData:{
                labels: DateArray,
            }
        });
        return DateArray;
    }

    getData(){
        var dates = this.getDates();

        var jsonDates = "[" + dates + "]";

        fetch('api/statistics/getrevenue',{
            method : "POST",
            headers:{
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
            },
            body: jsonDates
        })
        .then(response => response.json() as Promise<number[]>)
        .then(data => {

            this.setState({
                linechartData:{
                    datasets:[{
                        data: data,
                        label:'Revenue',

                    backgroundColor:[
                        'rgba(255, 0, 0, 0.6)','rgba(125, 125, 142, 0.6)',
                        'rgba(255, 146, 0, 0.6)','rgba(0, 255, 207, 0.6)',
                        'rgba(255, 224, 0, 0.6)','rgba(0, 157, 255, 0.6)',
                        'rgba(136, 255, 0, 0.6)','rgba(21, 0, 255, 0.6)',
                        'rgba(255, 0, 166, 0.6)','rgba(175, 0, 255, 0.6)',                 
                    ]
                    }]
                }
            })
        })
    }

    getLineChartData(){
        var labels = this.getLabels();

        this.getData();

        this.setState({
          linechartData:{
            labels: labels
        }
        })
      }
      
    render(){
        return (
            <div className="chart">
                <Line data={this.state.linechartData}
                     options={{
                         title:{
                             display:true,
                             text:'Revenue',
                             fontSize:25
                         },
                     }}
                     />
            </div>
        )
    }
}