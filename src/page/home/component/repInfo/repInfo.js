import './repInfo.css';
import { useEffect , useState } from 'react';

export default function RepInfo(props){
    const [repQuantity,setQuantity] = useState('');

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
        setRepQuantity();
        
        return () => {

        }
    }, [])

    const ShowRepInfo = () =>{
        if(repInfo.length!==0){
            return(
                <div className="content-repInfo">
                    <div className="repInfo-head">
                        <i class="nes-octocat animate"></i>
                        <div className="nes-balloon from-left">
                            <p>Up to now, you have {repQuantity} public repositories !</p>
                        </div>
                    </div>

                    <div className='rep-list'>
                        <ul className="nes-list is-circle">
                            <li>Good morning.</li>
                            <li>Thou hast had a good night's sleep, I hope.</li>
                            <li>Thou hast had a good afternoon</li>
                            <li>Good night.</li>
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