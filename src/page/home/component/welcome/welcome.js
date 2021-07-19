import './welcome.css';
import { useParams } from 'react-router-dom';
import githubLogo from '../../../../assets/img/github_logo.png';
import animation from '../../../../animation/index';
import { animated } from 'react-spring';
export default function Welcome(props){
    
    const params = useParams();
    const {avatar} = props;

    //动画style
    const translationGithub = animation.Translation({x:500},{x:0},{duration:300});
    const translationTitle = animation.Translation({y:-200},{y:0},{duration:500});
    const gradient = animation.Gradient(0,1,{duration:2000});
    const loopTranslation = animation.LoopTranslation({y:-30},{y:0});

    return (
        <div className="content-welcome">
            <div className='welcome-head'>
                <animated.img className='avatar' src={avatar} />
                <animated.div className='welcome-title' style={translationTitle}>
                    <p>{params.name}</p>    
                    <p>Welcome to check your Github report!</p>
                </animated.div>
            </div>
            <animated.div className="welcome-message" style={gradient}>
                <p>Dedicated to you <br/> who are  dedicated to open source</p>
                <p>Slide down to see more</p>
            </animated.div>
            <animated.img src={githubLogo} className="github-logo" style={translationGithub}/>
            <animated.p className="next" style={loopTranslation}>↓</animated.p>
        </div>
    );
}