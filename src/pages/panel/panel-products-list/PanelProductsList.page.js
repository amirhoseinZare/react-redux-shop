import {PanelHeader} from "../../../layouts/index"
import {ProductsTable} from "../../../components/index"

function PanelProductsList (){
    return (
        <div>
            <PanelHeader/>
            <ProductsTable/>
        </div>
    )
}

export {PanelProductsList}