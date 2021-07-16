import './home.css';
import { useParams , useHistory } from 'react-router-dom';
import { useEffect , useState , useRef} from 'react';
import api from '../../request/request';
import Welcome from "./component/welcome/welcome";
import Second from './component/second/second';

export default function Home() {
  
  const [progress_val, setProgressVal] = useState(0);
  const [followers,setFollowers] = useState(''); //followers数
  const [dateInfo,setDateInfo] = useState([]); //commit数
  const [repInfo,setRepInfo] = useState([]); //项目信息
  const [avatar,setAvatar] = useState('');  //头像
  const [isShow,setShow] = useState(false); //进度条结束，展示页面
  const contentDiv = useRef(null);

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

  //节流，防止高频率滚动鼠标或滑动屏幕
  const throttle = (event, time)=>{
    let pre = 0;
    return function (...args) {
      if (Date.now() - pre > time) {
        pre = Date.now();
        event.apply(this, args);
      }
    }
  }

  useEffect(() => {
    let i = 0;
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
              
              //鼠标滚动
              const scrollFun = (event) => {
                const delta = event.detail || (-event.wheelDelta);
                if (delta > 0 ) {
                  if(i<4){
                    i = i + 1;
                  }
                }else if(delta < 0){
                  if(i!==0){
                    i = i - 1;
                  }
                }
                contentDiv.current.style.marginTop = -i*100+'vh'; //设置窗口位置
              }

              setTimeout(()=>{
                setShow(true);
                //根据浏览器判断用哪种监听
                if ((navigator.userAgent.toLowerCase().indexOf("firefox") !== -1)) {
                  window.addEventListener("DOMMouseScroll", throttle(scrollFun,1000), false)
                } else if (window.addEventListener) {
                  window.addEventListener("mousewheel", throttle(scrollFun,1000), false)
                } 
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
        <div className="content-div" ref={contentDiv}>
          <Welcome avatar={avatar}></Welcome>
          <Second></Second>
        </div>
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
  