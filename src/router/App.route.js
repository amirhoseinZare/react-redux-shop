import { Switch, Route } from "react-router-dom"
import 
    { 
        CartPage,
        CheckoutPage,
        HomePage,
        PaymentFailedPage,
        PaymentSuccessPage,
        ProductDetailPage,
        ProductsListPage,
        ProductsGroupPage,
        NotFoundPage,
        PanelLoginPage,
        PanelOrdersPage,
        PanelProductsList,
        PanelQuantityPage
    } from "../pages/index"

function AppRouter(){
    return (
        
        <Switch>

            <Route exact path="/" component={HomePage}/>
            <Route exact path="/products" component={ProductsListPage}/>
            <Route exact path="/product/:productId" component={ProductDetailPage}/>
            <Route exact path="/cart" component={CartPage}/>
            <Route exact path="/checkout" component={CheckoutPage}/>
            <Route exact path="/payment/failed" component={PaymentFailedPage}/>
            <Route exact path="/payment/success" component={PaymentSuccessPage}/>
            <Route exact path="/product/group/:groupId" component={ProductsGroupPage}/>
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

            <Route component={NotFoundPage}/>
        </Switch>
    )
}

export {AppRouter}