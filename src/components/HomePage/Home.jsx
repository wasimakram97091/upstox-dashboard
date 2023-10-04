import React from "react";
import Styles from "./index.module.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.main__container}>
          <div className={Styles.main__container__text}>
            <h2>"The goal of a successful trader is to make the best trades. Money is secondary."</h2>
            <Link to="/tab">
              <button>Start Trading</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
