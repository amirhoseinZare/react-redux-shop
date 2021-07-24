import { PanelLoginPage, PanelOrdersPage, PanelProductsList, PanelQuantityPage } from "../pages/index"
import { Route } from "react-router-dom"

export const PanelRoutes = ()=>(
    <Route
        path="/panel"
        render={({ match: { url } }) => (
        <>
            <Route exact path={`${url}/login`} component={PanelLoginPage} />
            <Route exact path={`${url}/orders`} component={PanelOrdersPage} />
            <Route exact path={`${url}/products`} component={PanelProductsList} />
            <Route exact path={`${url}/quantity`} component={PanelQuantityPage} />
        </>
        )}
    />
)