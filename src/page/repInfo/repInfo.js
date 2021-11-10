import './repInfo.css';
import { useEffect , useState ,useRef } from 'react';
import animation from '../../animation/index';
import { animated } from 'react-spring';


export default function RepInfo(props){
    const [repQuantity,setQuantity] = useState('');
    const [mostStars,setMostStars] = useState({});
    const [mostContributions,setMostContributions] = useState({});
    const repUl = useRef(null);
    const repContent = useRef(null);

    const {repInfo} = props;

    const translationGithub = animation.Translation({x:-500},{x:0},{duration:500});
    const translationTalk = animation.Translation({x:700},{x:0},{duration:500});

    useEffect(() => {
        //设置公开仓库数量
        const setRepQuantity = () =>{
            if(repInfo.length < 1000){
                setQuantity(repInfo.length);
            }else{
                let replength = Math.floor(repInfo.length/1000) + 'k+';
                setQuantity(replength);
            }
        }
        //设置公开仓库数量
        setRepQuantity();
        //设置最多stars的仓库
        let mostStarRep = repInfo.reduce((a,b)=>{
            return b.stargazers_count > a.stargazers_count ? b : a;
        });
        setMostStars(mostStarRep);
        //设置最多contributions的仓库
        let mostContributions = repInfo.reduce((a,b)=>{
            return b.contributions > a.contributions ? b : a;
        })
        setMostContributions(mostContributions);
        //设置仓库列表循环滚动
        let interval;
        let i = 0;
        //假如仓库列表高度大于容器高度，则触发滚动，每0.1s滚动10px
        if(repContent.current.clientHeight < repUl.current.clientHeight){
            interval = setInterval(()=>{
                if(repUl.current.style.marginTop.replace(/[^\d]/g,' ') > repUl.current.clientHeight + repContent.current.clientHeight/3){
                    i = -50;
                }
                repUl.current.style.marginTop =  -10 * i + 'px';
                i++;
            },100)
        }
        return () => {
            //页面卸载时清除Interval
            clearInterval(interval)
        }
    }, [repInfo])

    const ShowRepInfo = () =>{
        if(repInfo.length!==0){
            return(
                <div className="content-repInfo">
                    {/* 头部 */}
                    <div className="repInfo-head">
                        <animated.i className="nes-octocat animate rep-octocat"  style={translationGithub}></animated.i>
                        <animated.div className="nes-balloon from-left rep-balloon" style={translationTalk}>
                            <p>Up to now, you have {repQuantity} public repositories !</p>
                        </animated.div>
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
                    <div className="rep-statistics nes-container is-rounded is-dark" >
                        <div className="stars-rep">
                            <span>The repository you have the most </span> 
                            <i className="nes-icon is-medium star"></i>
                            <span> is {mostStars.name},</span><br/>
                            <span>It has {mostStars.stargazers_count} stars.</span>
                        </div>

                        <div className="contributions-rep">
                            <span>The repository you have the most contributions</span> 
                            <span> is {mostContributions.name},</span><br/>
                            <span>It has {mostContributions.contributions} contributions.</span>
                        </div>        
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