import { AppRouter } from "./router/App.route.jsx"
import {connect} from "react-redux"
import {useEffect} from "react"
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App({cart}) {
  useEffect(()=>{
    console.log(cart)
  }, [])
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}


const mapStateToProps = (state)=>({
  cart: state.user.cart
})

export default connect(mapStateToProps)(App);
