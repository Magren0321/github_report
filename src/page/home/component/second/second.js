import './second.css';
import animation from '../../../../animation/index';
import { animated } from 'react-spring';
export default function Second(props){

    const translationAvatar = animation.Translation({x:500},{x:0},{duration:2000});

    return (
        <animated.div className="constent-second" style={translationAvatar} >
            <div className="second-head">
                xxx
            </div>
        </animated.div>
    )
}