import { useState  } from 'react'
import {useHistory} from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import './login.css';
import api from '../../request/request';

export default function Login() {
  const loading = 'Loading...';
  const loadingStyle = 'nes-btn is-warning';
  const start = 'Start';
  const startStyle = 'nes-btn is-success';

  const [name, setName] = useState(''); //Github用户名
  const [btn_name,setBtnName] = useState('Start'); //按钮文字
  const [btn_class,setBtnClass] = useState('nes-btn is-success'); //按钮样式
  const history = useHistory(); //路由

  //点击按钮
  const btnClick = ()=>{
    setBtn(loading,loadingStyle);
    //向github api请求，若无用户会返回404，若存在会返回用户信息
    api.getInfo(name).then(res=>{
      console.log(res);
      if(res.status === 404){
        alert('Error! The user could not be found')
        setBtn(start,startStyle);
      }else{
        history.push('/user/'+name);
      }
    })
  }
  //样式转换
  const setBtn = (btnName,btnClass) =>{
    setBtnName(btnName);
    setBtnClass(btnClass);
  }
  //存储input值
  const handleChange = (e)=>{
    setName(e.target.value);
  }
  //设置动画，从透明到显示，执行时间2.5s
  const animation = useSpring({
    from: { opacity: 0 }, 
    to: { opacity: 1 },
    config: { duration: 2500 }
  });

  return (
    <div className="content">
      <animated.div  className="nes-container with-title login" style={animation}>
        <h3 className='title h3title'>Github Summary</h3>
        <i className="nes-octocat animate"></i>
        <input type="text" id="name_field" className="nes-input" placeholder="Username" value={ name } onChange={ handleChange }/>
        <button type='button' className={btn_class} onClick={btnClick} >{btn_name}</button>
      </animated.div>
    </div>
  );
}
  
  