import axios from './index';

const githubApi = 'https://api.github.com';
// const myApi = 'http://localhost:4000';
const myApi = 'http://119.23.216.219:4000';

const request = {
    /**
     * 获取github用户的Contributions
     * @param {string} name 
     * @returns 
     */
    getContributions(name){
        return axios({
            url:myApi+'/getgithub?name='+name,
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
            url:githubApi+'/users/'+name,
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
            url:githubApi+'/users/'+name+'/repos',
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
            url:githubApi+'/repos/'+userName+'/'+repName+'/contributors',
            method:'get'
        })
    }
}

export default request;