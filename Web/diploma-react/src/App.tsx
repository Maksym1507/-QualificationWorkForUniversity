import { observer } from 'mobx-react-lite';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header';
import NoMatchComponent from './components/NoMatch';
import CatalogItemList from './pages/Catalog';
import CatalogItem from './pages/CatalogItem/CatalogItemComponent';
import CatalogStore from './stores/catalogStore';
import { BasketStore } from './stores/basketStore';
import BasketComponent from './pages/Basket/BasketComponent';
import { UserStore } from './stores/userStore';
import SignUpComponent from './pages/SignUp/SignUpComponent';
import LoginComponent from './pages/SignIn/LoginComponent';
import CabinetComponent from './pages/Cabinet/CabinetComponent';
import { OrderStore } from './stores/order.store';
import OrderHistoryComponent from './pages/Order/OrderHistoryComponent';
import OrderComponent from './pages/Order/OrderComponent';

export const userStore = new UserStore();
export const catalogStore = new CatalogStore();
export const basketStore = new BasketStore();
export const orderStore = new OrderStore();

const App: FC = observer(() => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeaderComponent />}>
          <Route index element={<Navigate replace to="product" />} />
          <Route
            path="product"
            element={<CatalogItemList />} />
          <Route path="product/:id" element={<CatalogItem />} />
          <Route path="basket" element={<BasketComponent />} />
          {!userStore.isAuthenticated && (
            <>
              <Route path="register" element={<SignUpComponent />} />
              <Route path="login" element={<LoginComponent />} />
            </>
          )}
          :
          {
            <>
              <Route path="register" element={<Navigate replace to="/cabinet" />} />
              <Route path="login" element={<Navigate replace to="/cabinet" />} />
            </>
          }
          {userStore.isAuthenticated && (
            <>
              <Route path="cabinet" element={<CabinetComponent />} />
              <Route path="orders" element={<OrderHistoryComponent />} />
              <Route path="do-order" element={<OrderComponent />} />
              <Route path="register" element={<Navigate replace to="/cabinet" />} />
              <Route path="login" element={<Navigate replace to="/cabinet" />} />
            </>
          )}
          :
          {
            <>
              <Route
                path="cabinet"
                element={<Navigate replace to="/login" />}
              />
              <Route
                path="do-order"
                element={<Navigate replace to="/login" />}
              />
              <Route
                path="orders"
                element={<Navigate replace to="/login" />}
              />
            </>
          }
          <Route path="*" element={<NoMatchComponent />} />
        </Route>
      </Routes>
    </div>)
})

export default App;
