import './first.css';
import { useEffect , useState } from 'react';
import { useParams , useHistory } from 'react-router-dom';

export default function First(props){
    
    const params = useParams();
    const {avatar} = props;

    useEffect(()=>{
        
    });

    return (
        <div className="contentFirst">
            <div className='head'>
                <img className='avatar' src={avatar}></img>
                <div>
                    <h1>{params.name}</h1>    
                    <h1>Welcome to check your Github report!</h1>
                </div>
            </div>
        </div>
    );
}