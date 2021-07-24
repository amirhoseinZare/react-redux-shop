import { AppRouter } from "./router/App.route.jsx"
import {connect} from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const App = ()=>(
  <div className="App">
    <AppRouter/>
  </div>
)

const mapStateToProps = (state)=>({
  cart: state.user.cart
})

export default connect(mapStateToProps)(App);
