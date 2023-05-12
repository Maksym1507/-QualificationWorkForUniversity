import { observer } from 'mobx-react-lite';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header';
import NoMatchComponent from './components/NoMatch';
import CatalogStore from './pages/Catalog/CatalogStore';
import CatalogItemList from './pages/Catalog';
import CatalogItem from './pages/CatalogItem/CatalogItem';

export const catalogStore = new CatalogStore();

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
        </Route>
        <Route path="*" element={<NoMatchComponent />} />
      </Routes>
    </div>)
})

export default App;
