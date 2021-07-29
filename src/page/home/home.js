import './home.css';
import { useParams , useHistory } from 'react-router-dom';
import { useEffect , useState } from 'react';
import api from '../../request/request';
import Welcome from '../welcome/welcome';
import RepInfo from '../repInfo/repInfo';
import End from '../end/end';
import Contributions  from '../contributions/contributions';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import satellite4 from '../../assets/img/satellite4.svg';
import cloud from '../../assets/img/cloud.svg';
import earth from '../../assets/img/earth.svg';

export default function Home() {

  const params = useParams();
  const history = useHistory();
  
  const [progress_val, setProgressVal] = useState(0);
  const [dateInfo,setDateInfo] = useState([]); //commit数
  const [repInfo,setRepInfo] = useState([]); //项目信息
  const [avatar,setAvatar] = useState('');  //头像
  const [isShow,setShow] = useState(false); //进度条结束，展示页面

  useEffect(() => {
    let interval;
    //进度条增加方法
    const increaseProgress = (start,end) => {
      let i = start;
      let l = end;
      interval = setInterval(()=>{
        if(i === l){
          if(i === 100){
            setShow(true);
            clearInterval(interval);
          }
          clearInterval(interval);
        }else{
          i++;
          setProgressVal(i);
        }
      },30)
    }

    //将获取到的项目信息进行解析，获取项目名，url，star数，commit数
    const getRepInfo = async (userName,repList)=>{
      const repInfoList = [];
      for(let item of repList){
        let data = {};
        data.name = item.name;
        data.url = item.html_url;
        data.stargazers_count = item.stargazers_count;
        await api.getRepContributions(userName,item.name).then(res =>{
          if(res.data.status !== 200){
            console.log('这里出问题了！',res);
            alert(res.data.msg || res.data.message)
            history.replace('/');
            return;
          }
          data.contributions = res.data.data.contributions;
        })
        repInfoList.push(data);
      }
      return repInfoList;
    }

    increaseProgress(0,30);
    //获取项目列表
    api.getRep(params.name).then(res=>{
      // 请求出现问题返回上一页
      if(res.data.status !== 200){
        console.log('这里出问题了！',res);
        alert(res.data.msg || res.data.message)
        history.replace('/');
        return;
      }
      //获取到的个人仓库列表
      let replist = res.data.data;
      //获取每个项目的信息（项目名，url，star数，commit数）
      getRepInfo(params.name,replist).then(res=>{
        setRepInfo(l => l.concat(res))
        increaseProgress(30,70)
        //获取个人信息（设置头像，followers数）
        api.getInfo(params.name).then(res=>{
          setAvatar(res.data.data.avatar_url)
          //获取每天的contribution数
          api.getContributions(params.name).then(res=>{
            if(res.data.status !== 200){
              console.log('这里出问题了！',res);
              alert(res.data.msg || res.data.message)
              history.replace('/');
              return;
            }
            setDateInfo( d => d.concat(res.data.data));
            increaseProgress(70,100);
          })
        })
      });
    })
    return () => {
      clearInterval(interval);
    };
  }, [history,params])

  //当数据请求到后隐藏进度条，显示内容
  const ShowDiv = () => {
    if(isShow){
      return (
          <Parallax pages={4}>

          <ParallaxLayer
            offset={0}
            speed={3}>
            <Welcome avatar={avatar}></Welcome>
          </ParallaxLayer>

          <ParallaxLayer offset={1.28} speed={-0.3} >
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
            speed={1}>
            <RepInfo repInfo={repInfo}></RepInfo>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={cloud} style={{ display: 'block', width: '10%', marginLeft: '20%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '85%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer offset={2.2} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '5%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '10%', marginLeft: '65%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2} 
            speed={1.5}>
            <Contributions dateInfo={dateInfo}></Contributions>
          </ParallaxLayer>


          <ParallaxLayer offset={3} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={cloud} style={{ display: 'block', width: '20%', marginLeft: '10%' }} alt="cloud"/>
            <img src={cloud} style={{ display: 'block', width: '10%', marginLeft: '55%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer offset={2.8} speed={0.2} style={{ opacity: 0.2 }}>
            <img src={cloud} style={{ display: 'block', width: '15%', marginLeft: '15%' }} alt="cloud"/>
          </ParallaxLayer>

          <ParallaxLayer offset={3.5} speed={0.2} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <img src={earth} style={{ width: '60%'}} alt="earth"/>
          </ParallaxLayer>

          <ParallaxLayer
            offset={3} 
            speed={1.5}>
            <End/>
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
  