import { Switch, Route } from "react-router-dom"
import {PanelRoutes} from "./Panel.route.jsx"
import { PanelMainPage, CartPage, CheckoutPage, HomePage, PaymentFailedPage, PaymentSuccessPage, ProductDetailPage, ProductsGroupPage,NotFoundPage, PanelLoginPage, PanelOrdersPage, PanelProductsList, PanelQuantityPage, } from "../pages/index"

export const AppRouter = () =>(
    <Switch >
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/product/:productId" component={ProductDetailPage}/>
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/checkout" component={CheckoutPage}/>
        <Route exact path="/payment/failed" component={PaymentFailedPage}/>
        <Route exact path="/payment/success" component={PaymentSuccessPage}/>
        <Route exact path="/product/group/:groupId/:groupName" component={ProductsGroupPage}/>
        <Route path="/panel" component={PanelRoutes}/>
        <Route component={NotFoundPage}/>
    </Switch>
)
