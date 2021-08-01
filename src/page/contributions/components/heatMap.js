import { useEffect , useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from "react-tooltip";
import 'react-calendar-heatmap/dist/styles.css';
import './heatMap.css'

export default function HeatMap(props) {
    //PC
    const [startDay,setStartDay] = useState('');
    const [endDay,setEndDay] = useState('');
    const [values,setValues] = useState([]);
    //Mobile
    const [monthStartDay,setMonthStartDay] = useState('');
    const [monthEndDay,setMonthEndDay] = useState('');
    const [monthValues,setMonthValues] = useState([]);

    const { data } = props;

    const monthMap = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }

    useEffect(() => {
        //PC设置开始、结束日期以及数据
        setStartDay(data.year+'-01-01');
        setEndDay(data.year+'-12-31');
        let arr = data.date.map(item =>{
            return {
                date:item.data_date,
                count: parseInt(item.data_count)
            }
        })
        setValues(arr);
        //Mobile
        let thisMonth = parseInt(new Date().getMonth())+ 1
        if(thisMonth < 10){
            thisMonth = '0'+thisMonth;
        }
        let thisMonthDay = new Date(data.year,new Date().getMonth()+1,0).getDate();
        setMonthStartDay(data.year+'-'+thisMonth+'-01');
        setMonthEndDay(data.year+'-'+thisMonth+'-'+thisMonthDay);
        let monValues = [];
        data.date.forEach(item=>{
            if(item.data_date.split('-')[1] === thisMonth){
                monValues.push({
                    date:item.data_date,
                    count: parseInt(item.data_count)
                });
            }
        });
        setMonthValues(monValues)
        return () => {
            
        }
    }, [data])

    const IsMobile = ()=>{
        return (
            <div className="svg-content">
                <ReactTooltip />
                <span>Your contribution in {monthMap[new Date().getMonth()+1]} <i className="nes-icon is-medum like"></i></span>
                <div className="mobile-heatMap">
                <CalendarHeatmap 
                    startDate={new Date(monthStartDay)}
                    endDate={new Date(monthEndDay)}
                    values={monthValues}
                    gutterSize={2}
                    tooltipDataAttrs={(value) => {
                        if(value.count){
                            return {
                                "data-tip": `${value.count} contributions on ${value.date}` 
                            };
                        }else{
                            return {
                                "data-tip": `No contributions` 
                            };
                        }
                    }}
                    classForValue={(value) => {
                        if (value) {
                            if(value.count>4){
                                return `color-github-4`;
                            }else{
                                return `color-github-${value.count}`;
                            }
                        }else{
                            return 'color-empty'
                        }
                    }}
                />
                </div>
            </div>
        )
    }

    const IsPC = () =>{
        return (
            <div className="svg-content">
                <ReactTooltip />
                <span>Your contribution in {data.year} <i className="nes-icon is-medum like"></i></span>
                <CalendarHeatmap 
                    startDate={new Date(startDay)}
                    endDate={new Date(endDay)}
                    values={values}
                    gutterSize={2}
                    tooltipDataAttrs={(value) => {
                        if(value.count){
                            return {
                                "data-tip": `${value.count} on ${value.date}` 
                            };
                        }else{
                            return {
                                "data-tip": `No contributions` 
                            };
                        }
                    }}
                    classForValue={(value) => {
                        if (value) {
                            if(value.count>4){
                                return `color-github-4`;
                            }else{
                                return `color-github-${value.count}`;
                            }
                        }else{
                            return 'color-empty'
                        }
                    }}
                />
            </div>
        )
    }

    const Map = ()=>{
        if(document.documentElement.clientWidth > 1000){
            return (
                <IsPC/>
            )
        }else{
            return(
                <IsMobile/>
            )
        }
    }

    return (
        <Map/>
    )
}
