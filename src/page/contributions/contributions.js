import  './contributions.css';
import HeatMap from './components/heatMap';
import { useEffect , useState } from 'react';

export default function Contributions(props) {

    const {dateInfo} = props;
    const [myCreateDay,setCreateDay] = useState(0);
    const [mostContributions,setMostContributions] = useState({});

    useEffect(() => {
        //设置加入github的天数
        const getDay = () =>{
            let today = new Date().toLocaleDateString().replace(new RegExp('/','gm'),'-');
            let createDay = dateInfo[dateInfo.length-1].date[0].data_date;
            setCreateDay(Math.round((new Date(createDay) - new Date(today))  / (-1000 * 60 * 60 * 24)));
        }
        //设置最多contributions的天数以及提交数
        const getMostContributions = ()=>{
            let data= {
                data_count:'0',
                data_date:''
            };
            for(let item of dateInfo){
                for(let idx of item.date){
                    if(parseInt(idx.data_count) > parseInt(data.data_count)){
                        data.data_count = idx.data_count;
                        data.data_date = idx.data_date;
                    }
                }
            }
        setMostContributions(data);
        }
        
        getDay();
        getMostContributions();
        return () => {

        }
    }, [])

    return (
        <div className="content-commit">
            <div className="content-commit-head">
                <span>{myCreateDay} days have passed since you joined Github !</span> 
            </div>
            <div className="commit-statistics">
                <HeatMap data={dateInfo[0]}/>
            </div>
            <div className="content-most-commit">
                <div className="nes-container is-dark is-centered most-commit">
                    <span>You have the most contributions on {mostContributions.data_date}</span>
                    <br/><br/>
                    <span>That day you have {mostContributions.data_count} contributions.</span>
                    <br/>
                </div>
            </div>
        </div>
    )
}

