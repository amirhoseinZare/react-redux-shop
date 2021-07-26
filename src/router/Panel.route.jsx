import { PanelLoginPage, PanelOrdersPage, PanelProductsList, PanelQuantityPage, NotFoundPage, redirect } from "../pages/index"
import { Route, Switch } from "react-router-dom"

const url = "/panel"
export const PanelRoutes = ()=>(
    <Switch>
        <Route exact path="/panel/login" component={PanelLoginPage} />
        <Route exact path="/panel/orders" component={PanelOrdersPage} />
        <Route exact path="/panel/products" component={PanelProductsList} />
        <Route exact path="/panel/quantity" component={PanelQuantityPage} />
    </Switch>
)