import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import stockData from "../../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../features/counter/wishlistSlice";
import { addToOrderList } from "../../features/counter/orderSlice";

function Tab() {
  const [tab, setTab] = useState("stockData");
  const [wishListStatus, setWishListStatus] = useState({});
  const [cartStatus, setCartStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { watchList } = useSelector((state) => state.data);
  const { orderList } = useSelector((state) => state.orderData);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialWishListStatus = {};
    const initialCartStatus = {};
    stockData[0].forEach((item) => {
      initialWishListStatus[item.id] = watchList.includes(item.id);
      initialCartStatus[item.id] = orderList.includes(item.id);
    });
    setWishListStatus(initialWishListStatus);
    setCartStatus(initialCartStatus);
  }, [watchList, orderList]);

  const tabHandler = (tabName) => {
    setTab(tabName);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStockData = stockData[0].filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderListItem = (item, handleWishList, handleOrder) => {
    return (
      <li key={item.id}>
        <div className={Styles.main__container__data__ul__listData}>
          <div className={Styles.main__container__data__ul__listData__listItem1}>
            <h2>{item.name}</h2>
            <p>{item.stockExchange}</p>
          </div>
          <div className={Styles.main__container__data__ul__listData__listItem2}>
            <button onClick={() => handleWishList(item)} className={`${Styles.main__container__data__ul__listData__listItem2__btn1} ${wishListStatus[item.id] ? Styles.red : ""}`}>
              <i className="fa-solid fa-heart"></i>
            </button>
            <button onClick={() => handleOrder(item)} className={`${Styles.main__container__data__ul__listData__listItem2__btn2} ${cartStatus[item.id] ? Styles.green : ""}`}>
              <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>
          <div className={Styles.main__container__data__ul__listData__listItem3}>
            <p>₹ {item.stockPrice}</p>
            <p style={!item.stockValueChange.includes("-") ? { color: "green" } : { color: "red" }}>{item.stockValueChange}</p>
          </div>
        </div>
      </li>
    );
  };

  const wishListHandler = (item) => {
    dispatch(addToWishList(item.id));
    setWishListStatus((prevStatus) => ({
      ...prevStatus,
      [item.id]: true,
    }));
  };

  const orderHandler = (item) => {
    dispatch(addToOrderList(item.id));
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [item.id]: true,
    }));
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.main__container}>
        <h2>Welcome to UPSTOX</h2>
        <p>Start trading to see some magic happen!</p>
        <div className={Styles.main__container__search}>
          <input type="text" placeholder="Search stock data" value={searchQuery} onChange={handleSearch} />
        </div>

        <div className={Styles.main__container__ul}>
          <ul>
            <li onClick={() => tabHandler("stockData")} className={`${tab === "stockData" ? Styles.active : ""}`}>
              STOCK DATA
            </li>
            <li onClick={() => tabHandler("wishList")} className={`${tab === "wishList" ? Styles.active : ""}`}>
              YOUR WISHLIST
            </li>
            <li onClick={() => tabHandler("orders")} className={`${tab === "orders" ? Styles.active : ""}`}>
              YOUR ORDERS
            </li>
          </ul>
        </div>

        {tab === "stockData" && (
          <div className={Styles.main__container__data}>
            <div className={Styles.main__container__data__ul}>
              <ul>{filteredStockData.map((item) => renderListItem(item, wishListHandler, orderHandler))}</ul>
            </div>
          </div>
        )}

        {tab === "wishList" && (
          <div className={Styles.main__container__wishlistData}>
            <div className={Styles.main__container__wishlistData__head}>
              <h2>Your Wish List</h2>

              {watchList.length ? (
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {stockData[0].filter((item) => watchList.includes(item.id)).map((item) => renderListItem(item, wishListHandler, orderHandler))}
                </ul>
              ) : (
                <p>--- Your Wishlist is Empty ---</p>
              )}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className={Styles.main__container__orderlist}>
            <div className={Styles.main__container__orderlist__head}>
              <h2>Your Order list</h2>

              {orderList.length ? (
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  {stockData[0].filter((item) => orderList.includes(item.id)).map((item) => renderListItem(item, wishListHandler, orderHandler))}
                </ul>
              ) : (
                <p>--- Your Orderlist is Empty ---</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tab;
