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
        console.log(repUl)
        console.log(repContent)
        //设置公开仓库数量
        setRepQuantity();
        //设置仓库列表循环滚动
        let interval;
        let i = 0;
        interval = setInterval(()=>{
            if(repUl.current.style.marginTop >= repUl.current.clientHeight - repContent.current.clientHeight){
                clearInterval(interval)
            }
            repUl.current.style.marginTop =  -50 * i + 'px';
        },100)
        
        return () => {
            clearInterval(interval)
        }
    }, [])

    const ShowRepInfo = () =>{
        if(repInfo.length!==0){
            return(
                <div className="content-repInfo">
                    <div className="repInfo-head">
                        <i className="nes-octocat animate rep-octocat"></i>
                        <div className="nes-balloon from-left rep-balloon ">
                            <p>Up to now, you have {repQuantity} public repositories !</p>
                        </div>
                    </div>

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