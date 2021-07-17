import service from "./http.model"

const getGroups = (config)=>{
    return service.get('/groups', config)
}

export {
    getGroups
}