import './home.css';
import { useParams , useHistory } from 'react-router-dom';
import { useEffect , useState } from 'react';
import api from '../../request/request';
import Welcome from "./component/welcome/welcome";
import RepInfo from './component/repInfo/repInfo';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import satellite4 from '../../assets/img/satellite4.svg';
import cloud from '../../assets/img/cloud.svg';

export default function Home() {
  
  const [progress_val, setProgressVal] = useState(0);
  const [followers,setFollowers] = useState(''); //followers数
  const [dateInfo,setDateInfo] = useState([]); //commit数
  const [repInfo,setRepInfo] = useState([]); //项目信息
  const [avatar,setAvatar] = useState('');  //头像
  const [isShow,setShow] = useState(false); //进度条结束，展示页面

  const params = useParams();
  const history = useHistory();

  //进度条增加
  const increaseProgress = (start,end) => {
    let i = start;
    let l = end;
    const interval = setInterval(()=>{
      if(i === l){
        clearInterval(interval);
      }else{
        i++;
        setProgressVal(p=>p+1);
      }
    },30)
  }

  //将获取到的项目信息进行解析，获取项目名，url，star数，commit数,顺便获取用户头像
  const getRepInfo = async (userName,repList)=>{
    const repInfoList = [];
    for(let item of repList){
      let data = {};
      data.name = item.name;
      data.url = item.html_url;
      data.stargazers_count = item.stargazers_count;
      await api.getRepContributions(userName,item.name).then( res =>{
        data.avatarUrl = JSON.parse(res.data)[0].avatar_url;
        data.contributions = JSON.parse(res.data)[0].contributions;
      })
      repInfoList.push(data);
    }
     return repInfoList;
  }

  useEffect(() => {
    increaseProgress(1,30);
    //获取项目列表
    api.getRep(params.name).then(res=>{
      if(res.data.msg === '请求超时或服务器异常' || res.status !== 200){
        alert(res.data.msg)
        history.replace('/');
      }else{
        //清除掉fork的项目
        let replist = JSON.parse(res.data);
        replist.forEach((item,index)=>{
          if(item.fork === true){
            replist.splice(index,1);
          }
        })
        //获取每个项目的信息
        getRepInfo(params.name,replist).then(res=>{
          console.log(res);
          setAvatar(res[0].avatarUrl);
          setRepInfo(l => l.concat(res))
          increaseProgress(30,80);
          //获取每天的contribution数以及follower数
          api.getContributions(params.name).then(res=>{
            console.log(res);
            if(res.data.msg === '请求超时或服务器异常'){
              alert(res.data.msg)
              history.replace('/');
            }else{
              setDateInfo( d => d.concat(res.data.dateList));
              setFollowers(res.data.followers);
              increaseProgress(80,100);
              
              setTimeout(()=>{
                setShow(true);
              },1500)
            }
          })
        });
      }
    })
    return () => {

    };
  }, [params,history])

  //当数据请求到后隐藏进度条，显示内容
  const ShowDiv = () => {
    if(isShow){
      return (
          <Parallax pages={2}>

          <ParallaxLayer
            offset={0}
            speed={3}>
            <Welcome avatar={avatar}></Welcome>
          </ParallaxLayer>

          <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
            <img src={satellite4} className="satellite4" alt="satellite"/>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={cloud} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud"/>
          </ParallaxLayer>
            

          <ParallaxLayer 
            offset={1} 
            speed={2}>
            <RepInfo repInfo={repInfo}></RepInfo>
          </ParallaxLayer>

        </Parallax>
      )
    }else{
      return (
        <div className='progress'>
          <progress className="nes-progress" value={progress_val} max="100"></progress>
        </div>
      );
    }
  }

  return (
    <div className="content-home">
      <ShowDiv />
    </div>
  );
}
  