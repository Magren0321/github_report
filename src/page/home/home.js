import "./home.css";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../request/request";
import Welcome from "../welcome/welcome";
import RepInfo from "../repInfo/repInfo";
import End from "../end/end";
import Contributions from "../contributions/contributions";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import satellite4 from "../../assets/img/satellite4.svg";
import cloud from "../../assets/img/cloud.svg";
import earth from "../../assets/img/earth.svg";

export default function Home() {
  const params = useParams();
  const history = useHistory();

  const [progress_val, setProgressVal] = useState(0);
  const [dateInfo, setDateInfo] = useState([]); //commit数
  const [repInfo, setRepInfo] = useState([]); //项目信息
  const [avatar, setAvatar] = useState(""); //头像
  const [isShow, setShow] = useState(false); //进度条结束，展示页面

  useEffect(() => {
    let interval;
    //进度条增加方法
    const increaseProgress = (start, end) => {
      let i = start;
      let l = end;
      interval = setInterval(() => {
        i++;
        setProgressVal(i);
        setShow(v => {
          if(i===100){
            return true;
          }
        });
        if (i === l) {
          clearInterval(interval);
        }
      }, 30);
    };
    //将获取到的项目信息进行解析，获取项目名，url，star数，commit数
    const getRepInfo = async (userName, repList) => {
      const repInfoList = [];
      for (let item of repList) {
        let data = {};
        data.name = item.name;
        data.url = item.html_url;
        data.stargazers_count = item.stargazers_count;
        await api.getRepContributions(userName, item.name).then((res) => {
          data.contributions = res.data.data.contributions;
        });
        repInfoList.push(data);
      }
      setRepInfo((l) => l.concat(repInfoList));
    };
    //获取项目列表
    const getRep = async () => {
      const res = await api.getRep(params.name);
      return res.data.data;
    };
    //设置头像
    const getInfo = async () => {
      const res = await api.getInfo(params.name);
      setAvatar(res.data.data.avatar_url);
    };
    //获取每天的contribution数
    const getContributions = async () => {
      const res = await api.getContributions(params.name);
      setDateInfo((d) => d.concat(res.data.data));
    };

    increaseProgress(0, 30);
    (async () => {
      const replist = await getRep();
      await getRepInfo(params.name, replist);
      increaseProgress(30, 70);
      await getContributions();
      await getInfo();
      increaseProgress(70, 100);
    })().catch((e) => {
      console.log(e);
      alert("请求出问题了");
      history.replace("/");
    });

    return () => {
      clearInterval(interval);
    };
  }, [history, params]);

  //当数据请求到后隐藏进度条，显示内容
  const ShowDiv = () => {
    if (isShow) {
      return (
        <Parallax pages={4}>
          <ParallaxLayer offset={0} speed={3}>
            <Welcome avatar={avatar}></Welcome>
          </ParallaxLayer>

          <ParallaxLayer offset={1.28} speed={-0.3}>
            <img src={satellite4} className="satellite4" alt="satellite" />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "55%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "10%", marginLeft: "15%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "70%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "40%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={1}>
            <RepInfo repInfo={repInfo}></RepInfo>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "10%", marginLeft: "20%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "85%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.2} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "5%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "10%", marginLeft: "65%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={1.5}>
            <Contributions dateInfo={dateInfo}></Contributions>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "20%", marginLeft: "10%" }}
              alt="cloud"
            />
            <img
              src={cloud}
              style={{ display: "block", width: "10%", marginLeft: "55%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.8} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={cloud}
              style={{ display: "block", width: "15%", marginLeft: "15%" }}
              alt="cloud"
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={3.5}
            speed={0.2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <img src={earth} style={{ width: "60%" }} alt="earth" />
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={1.5}>
            <End />
          </ParallaxLayer>
        </Parallax>
      );
    } else {
      return (
        <div className="progress">
          <progress
            className="nes-progress"
            value={progress_val}
            max="100"
          ></progress>
        </div>
      );
    }
  };

  return (
    <div className="content-home">
      <ShowDiv />
    </div>
  );
}
