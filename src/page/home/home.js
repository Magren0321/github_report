import './home.css';
import { useParams , useHistory } from 'react-router-dom';
import { useEffect , useState } from 'react';
import api from '../../request/request';

export default function Home() {
  
  const [progress_val, setProgressVal] = useState(0);
  const [followers,setFollowers] = useState('');
  const [dateInfo,setDateInfo] = useState([]);
  const [repInfo,setRepInfo] = useState([]);
  const [avatar,setAvatar] = useState('');
  const [isShow,setShow] = useState(false);

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
    api.getRep(params.name).then(res=>{
      if(res.data.msg === '请求超时或服务器异常'){
        alert(res.data.msg)
        history.replace('/');
      }else{
        getRepInfo(params.name,JSON.parse(res.data)).then(res=>{
          setAvatar(res[0].avatarUrl);
          setRepInfo(l => l.concat(res))
          increaseProgress(30,80);
          api.getContributions(params.name).then(res=>{
            console.log(res);
            if(res.data.msg === '请求超时或服务器异常'){
              alert(res.data.msg)
              history.replace('/');
            }else{
              setDateInfo( d => d.concat(res.data.dateList));
              setFollowers(res.data.followers);
              increaseProgress(80,100);
              setShow(true)
            }
          })
        });
      }
    })
    return () => {};
  }, [params,history])

  return (
    <div className="contentHome">
      <div className='progress'>
        <progress className="nes-progress" value={progress_val} max="100"></progress>
      </div>
    </div>
  );
}
  