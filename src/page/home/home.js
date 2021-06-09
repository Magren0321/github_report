import './home.css';
import { useParams , useHistory } from 'react-router-dom';
import { useEffect , useState } from 'react';
import api from '../../request/request';

export default function Home() {
  
  const [progress_val, setProgressVal] = useState(0);
  const [followers,setFollowers] = useState('');
  const [repInfo,setRepInfo] = useState([]);

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

  //将获取到的项目信息进行解析，获取项目名，url，star数，commit数
  const getRepInfo =  (userName,repList)=>{
     const repinfoList = Array.prototype.map.call(repList, item => {
       let data = {};
       data.name = item.name;
       data.url = item.html_url;
       data.stargazers_count = item.stargazers_count;
       api.getRepContributions(userName,item.name).then( res =>{
          data.contributions = res.data[0].contributions;
       })
       return data;
     })

     return repinfoList;
  }

  useEffect(() => {
    increaseProgress(1,30);
    api.getRep(params.name).then(res=>{
      if(res.data.msg === '请求超时或服务器异常'){
        alert(res.data.msg)
        history.replace('/');
      }else{
        const repList = getRepInfo(params.name,JSON.parse(res.data));
        console.log(repList)
        increaseProgress(30,80);
        api.getContributions(params.name).then(res=>{
          console.log(res);
          if(res.data.msg === '请求超时或服务器异常'){
            alert(res.data.msg)
            history.replace('/');
          }
          increaseProgress(80,100);
        })

      }
    })
    return () => {};
  }, [params,history])

  return (
    <div className="contentHome">
      <div className='progress'>
        <progress className="nes-progress" value={progress_val} max="100"></progress>
      </div>
      <p>name:{params.name}</p>
    </div>
  );
}
  