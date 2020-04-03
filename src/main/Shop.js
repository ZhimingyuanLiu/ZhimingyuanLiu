import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiMain';
import List from './List';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';

export default function Shop() {
  const [custFilters, setCustFilters] = useState({
    filters: {
      category: [],
      price: []
    }
  });
  const [categories, setcategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filterResults, setFilterResults] = useState([]);
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setcategories(data);
      }
    });
  };

  const loadFilterResult = newFilters => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, custFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResults([...filterResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const ButtonForMore = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilterResult(skip, limit, custFilters.filters);
  }, []);

  const hanldeFilters = (filters, filterBy) => {
    const newFilters = { ...custFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilterResult(custFilters.filters);
    setCustFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  return (
    <Layout
      title="Shop Page"
      decription="Find you favorite"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4> List by categories</h4>
          <ul>
            <List
              categories={categories}
              hanldeFilters={filters => hanldeFilters(filters, 'category')}
            ></List>
          </ul>

          <h4> List by prices</h4>
          <div>
            <RadioBox
              prices={prices}
              hanldeFilters={filters => hanldeFilters(filters, 'price')}
            ></RadioBox>
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filterResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          {ButtonForMore()}
        </div>
      </div>
    </Layout>
  );
}
