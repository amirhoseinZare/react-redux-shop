import {PanelHeader} from "../../../layouts/index"
import {OrdersTable} from "../../../components/index"

function PanelOrdersPage (){
    return (
        <div>
            <PanelHeader/>
            <OrdersTable/>
        </div>
    )
}

export {PanelOrdersPage}