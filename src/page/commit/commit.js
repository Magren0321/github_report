import  './commit.css';
import { useEffect , useState ,useRef } from 'react';

export default function Commit(props) {

    const {dateInfo} = props;

    useEffect(() => {
        console.log(dateInfo)
        return () => {

        }
    }, [])

    return (
        <div className="content-commit">
            <div>
                
            </div>
        </div>
    )
}

