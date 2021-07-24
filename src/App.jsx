import { AppRouter } from "./router/App.route.jsx"
import {connect} from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Link} from "react-router-dom"

const App = ()=>(
  <div className="App">
    <AppRouter/>
    <Link to="/haparot">404</Link>
  </div>
)

const mapStateToProps = (state)=>({
  cart: state.user.cart
})

export default connect(mapStateToProps)(App);
