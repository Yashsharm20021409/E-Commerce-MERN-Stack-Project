import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  // redirect to home page for currentUser
  // but on refreshing the page again we are able to access LoginPage to avoid these we use(presist in userRedx or store)
  const user = useSelector(state=>state.user.currentUser);
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/products/:category" element={<ProductList/>}></Route>
          <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login/>}> </Route>
          <Route exact path="/register" element={user ? <Navigate to="/"/> : <Register/>}></Route>
          <Route exact path="/product/:id" element={<Product/>}></Route>
          <Route exact path="/cart" element={<Cart/>}></Route>
          <Route exact path="/success" element={<Success/>}></Route>
        </Routes>
      </Router>
  
  );
}

export default App;
