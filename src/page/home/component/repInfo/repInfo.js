import './repInfo.css';
import { useEffect , useState ,useRef } from 'react';

export default function RepInfo(props){
    const [repQuantity,setQuantity] = useState('');
    const repUl = useRef(null);
    const repContent = useRef(null);

    const {repInfo} = props;

    //设置公开仓库数量
    const setRepQuantity = () =>{
        if(repInfo.length < 1000){
            setQuantity(repInfo.length);
        }else{
            let replength = Math.floor(repInfo.length/1000) + 'k+';
            setQuantity(replength);
        }
    }

    useEffect(() => {
        //设置公开仓库数量
        setRepQuantity();
        let mostStarRep = repInfo.reduce((a,b)=>{
            return b.stargazers_count > a.stargazers_count ? b : a;
        });
        console.log(mostStarRep)
        //设置仓库列表循环滚动
        let interval;
        let i = 0;
        //假如仓库列表高度大于容器高度，则触发滚动，每0.1s滚动10px
        if(repContent.current.clientHeight < repUl.current.clientHeight){
            interval = setInterval(()=>{
                if(repUl.current.style.marginTop.replace(/[^\d]/g,' ') > repUl.current.clientHeight - repContent.current.clientHeight/3.5){
                    i = -50;
                }
                repUl.current.style.marginTop =  -10 * i + 'px';
                i++;
            },100)
        }
        
        
        return () => {
            clearInterval(interval)
        }
    }, [])

    const ShowRepInfo = () =>{
        if(repInfo.length!==0){
            return(
                <div className="content-repInfo">
                    {/* 头部 */}
                    <div className="repInfo-head">
                        <i className="nes-octocat animate rep-octocat"></i>
                        <div className="nes-balloon from-left rep-balloon ">
                            <p>Up to now, you have {repQuantity} public repositories !</p>
                        </div>
                    </div>
                    {/* 仓库列表 */}
                    <div className="rep-list-content" ref={repContent}>
                        <ul className="nes-list is-circle rep-list" ref={repUl}>
                            {repInfo.map((item,index)=>{
                                return (
                                    <li key={index}>
                                        <div className="list-item">{item.name}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    {/* 仓库starts最多以及contributions最多 */}
                    <div className="rep-statistics">
                            <span>The repository you have the most </span> 
                            <i className="nes-icon is-medium star"></i>
                            <span> is</span>
                            
                    </div>
                </div>
            )
        }else{
            return(
                <div className="content-repInfo">
                    <div className="repInfo-head">
                        <i class="nes-octocat animate"></i>
                        <div className="nes-balloon from-left">
                            <p>Up to now, you don’t have any public repositories</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <ShowRepInfo />
    )
}