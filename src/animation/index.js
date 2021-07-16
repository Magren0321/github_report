import { useSpring } from 'react-spring'

const animation = {
    //渐变显示
    Gradient(from,to,config){
        const gradient = useSpring({
            from: { opacity: from }, 
            to: { opacity: to },
            config: config
        });
        return gradient;
    },
    //平移
    Translation(from,to,config = null){
        const translation = useSpring({
            from:from,
            to:to,
            config:config
        });
        return translation;
    },
    //循环平移
    LoopTranslation(from,to){
        const loopTranslation = useSpring({
            from:from,
            to:to,
            loop:{ reverse: true }
        })
        return loopTranslation;
    }
}

export default animation;