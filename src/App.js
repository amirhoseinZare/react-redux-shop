import './App.css';
import { AppRouter } from "./router/App.route"
import {connect} from "react-redux"
import {useEffect} from "react"

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
