import Spinner from "react-bootstrap/Spinner";
import styles from "./loader.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Loader() {
  return (
    <>
      <div className={cx("loader")}>
        <Spinner animation="grow" />
      </div>
    </>
  );
}

export default Loader;
