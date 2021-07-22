import './repInfo.css';
import { useEffect } from 'react';

export default function RepInfo(props){
    const {repInfo} = props;

    useEffect(() => {
        console.log(repInfo)
        return () => {
        }
    }, [])

    return (
        <div className="constent-repInfo"  >
            <div className="rep-head">Up to now, you have {repInfo.length} public repositories !</div>
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
}