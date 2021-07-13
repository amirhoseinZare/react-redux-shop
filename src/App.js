import './App.css';
import { AppRouter } from "./router/App.route"
import {connect} from "react-redux"
import {useEffect} from "react"
import 'react-toastify/dist/ReactToastify.css';

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
