import { PanelLoginPage, PanelOrdersPage, PanelProductsList, PanelQuantityPage, NotFoundPage, redirect } from "../pages/index"
import { Route } from "react-router-dom"

const url = "/panel"
export const PanelRoutes = ()=>(
        <>
            <Route exact path={`${url}/login`} component={PanelLoginPage} />
            <Route exact path={`${url}/orders`} component={PanelOrdersPage} />
            <Route exact path={`${url}/products`} component={PanelProductsList} />
            <Route exact path={`${url}/quantity`} component={PanelQuantityPage} />
            <Route component={NotFoundPage} render={()=><redirect to="/404"/>}/>
        </>
)