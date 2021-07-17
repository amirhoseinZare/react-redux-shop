import service from "./http.model"

const getOrders = (config)=>{
    return service.get('/orders', config)
}

const getOrder = (id, config)=>{
    return service.get(`/orders${id}`, config)
}

const postOrder = (config, body)=>{
    return service.post('/orders', {...body, ...config})
}

const patchOrder = (id, config, body)=>{
    return service.patch(`/orders/${id}`, {...body, ...config})
}

const deleteOrder = (id)=>{
    return service.delete(`/orders/${id}`)
}

export {
    getOrders,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
}