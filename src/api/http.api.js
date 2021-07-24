import axios from 'axios'
import {useHistory} from "react-router-dom"

const instance = axios.create();

class Service {
    constructor(entity){
        this.entity = entity;
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
                if (token) {
                  config.headers["token"] = token;
                }
                return config;
        }, function (error) {
            return Promise.reject(error);
        });
        
        instance.interceptors.response.use(res => {
            const {status} = res;
            if(status>=400){
                window.location.pathname = '/404'
            }
            return res
        }, (error)=> {
            return Promise.reject(error);
        });
        
        instance.defaults.timeout = 5000;
        instance.defaults.baseURL = 'http://localhost:3001';
    }

    gets = (config)=>{
        return instance.get(this.entity, config)
    }
    
    get = (id, config)=>{
        return instance.get(`/${this.entity}/${id}`, config)
    }
    
    post = (body)=>{
        return instance.post(`/${this.entity}`, body)
    }
    
    patch = (id, body)=>{
        return instance.patch(`/${this.entity}/${id}`, body)
    }
    
    delete = (id)=>{
        return instance.delete(`/${this.entity}/${id}`)
    }
}

export default Service