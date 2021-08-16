import { PanelLoginPage, PanelOrdersPage, PanelProductsList, PanelQuantityPage, NotFoundPage, redirect } from "../pages/index"
import { Route, Switch } from "react-router-dom"

const url = "/panel"
export const PanelRoutes = ()=>(
    <Switch>
        <Route exact path={`${url}/login`} component={PanelLoginPage} />
        <Route exact path={`${url}/orders`} component={PanelOrdersPage} />
        <Route exact path={`${url}/products`} component={PanelProductsList} />
        <Route exact path={`${url}/quantity`} component={PanelQuantityPage} />
        <Route component={NotFoundPage}/>
    </Switch>
)