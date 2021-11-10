import { useEffect} from "react";
import Welcome from "../../welcome/welcome";
import RepInfo from "../../repInfo/repInfo";
import End from "../../end/end";
import Contributions from "../../contributions/contributions";
import LazyLoad from 'react-lazyload';

export default function Content(props){
  

  useEffect(()=>{
    
    return(()=>{

    })
  },[])

  return (
    <div>
      <Welcome avatar={props.avatar}></Welcome>
      <LazyLoad height={929} once offset={[-500,0]}>
        <RepInfo repInfo={props.repInfo}></RepInfo>
      </LazyLoad>
      <LazyLoad once height={929} offset={[-500,0]}>
        <Contributions dateInfo={props.dateInfo}></Contributions>
      </LazyLoad>
      <LazyLoad once height={929} offset={[-500,0]}>
        <End />
      </LazyLoad>
    </div>
  );
}