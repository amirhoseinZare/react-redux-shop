import service from "./http.model"

const getProducts = (config)=>{
    return service.get('/products', config)
}

const getProduct = (id, config)=>{
    return service.get(`/products${id}`, config)
}

const postProduct = (config, body)=>{
    return service.post('/products', {...body, ...config})
}

const patchProduct = (id, config, body)=>{
    return service.patch(`/products${id}`, {...body, ...config})
}

const deleteProduct = (id)=>{
    return service.delete(`/products${id}`)
}

export {
    getProducts,
    getProduct,
    postProduct,
    patchProduct,
    deleteProduct
}