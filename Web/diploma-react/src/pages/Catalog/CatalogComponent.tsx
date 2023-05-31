import React, { ReactElement, FC } from "react";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap";
import CatalogItemCard from "./CatalogItemCard";
import { catalogStore } from "../../App";

const CatalogItemList: FC<any> = observer((): ReactElement => {
  const nextPage = async () => {
    if (catalogStore.currentPage < catalogStore.totalPages) {
      catalogStore.currentPage++;
      await catalogStore.prefetchData();
    }
  };

  const previousPage = async () => {
    if (catalogStore.currentPage !== 1) {
      catalogStore.currentPage--;
      await catalogStore.prefetchData();
    }
  };

  return (
    <>
      <div className="container-sm mt-2">
        {catalogStore.isLoading ? (
          <div className="container">
            <div className="row min-vh-100">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="container-sm">
              <div className="d-flex justify-content-start ms-5 mt-2 mb-2">
                <select
                  value={catalogStore.filter}
                  onChange={async (event) => {
                    debugger;
                    catalogStore.changeCurrentPage(1);
                    catalogStore.changeFilter(event.target.value);
                    await catalogStore.prefetchData();
                  }}
                >
                  <option disabled value="">
                    Filters
                  </option>
                  <option value="titleByAsc">Title by ascending</option>
                  <option value="titleByDesc">Title by descending</option>
                  <option value="priceByAsc">Price by ascending</option>
                  <option value="priceByDesc">Price by descending</option>
                </select>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {catalogStore.items.map((item) => (
                  <CatalogItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    weight={item.weight}
                    pictureUrl={item.pictureUrl}
                  />
                ))
                }
              </div>
            </div>
            <nav>
              <ul className="pagination justify-content-center align-center">
                <li className="page-item">
                  <a className="page-link" href="#" onClick={previousPage}>
                    &laquo;
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link">{catalogStore.currentPage}</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" onClick={nextPage}>
                    &raquo;
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div >
    </>
  );
});

export default CatalogItemList;
