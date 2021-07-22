import axios from './index';

const request = {
    /**
     * 获取github用户的所有Contributions以及日期
     * @param {string} name 
     * @returns 
     */
    getContributions(name){
        return axios({
            url:'/getAllContributions/'+name,
            method:'get'
        })
    },
    /**
     * 获取github用户的个人信息
     * @param {string} name 
     * @returns 
     */
    getInfo(name){
        return axios({
            url:'/getInfo/'+name,
            method:'get'
        })
    },
    /**
     * 获取github用户公开的项目详情
     * @param {string} name 
     * @returns 
     */
    getRep(name){
        return axios({
            url:'/getRep/'+name,
            method:'get'
        })
    },
    /**
     * 获取用户指定仓库下的contributions数
     * @param {string} userName 
     * @param {string} repName 
     * @returns 
     */
    getRepContributions(userName,repName){
        return axios({
            url:'/getRepContributions/'+userName+'/'+repName,
            method:'get'
        })
    }
}

export default request;