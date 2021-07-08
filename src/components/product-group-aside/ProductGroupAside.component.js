import {useEffect} from 'react'

function ProductsGroupAside(props){

    useEffect( async ()=>{
        console.log(props.groups)
    }, [props.groups])

    return (
        <section>
            {
                props.groups.map(group=>{
                    const {groupId:id, products, group:name} = group
                    return <article key={id}>
                        <h1>{name}</h1>
                        {products.map(prod=>{
                            const {name, id:prodId} = prod
                            return (<h3 key={prodId}>{name}</h3>)
                        })}
                    </article>
                })
            }
        </section>
    )
}

export {
    ProductsGroupAside
}