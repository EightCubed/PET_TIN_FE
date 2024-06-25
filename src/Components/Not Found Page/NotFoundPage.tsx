import { Link } from "react-router-dom";
import styles from "./notfoundpage.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NotFoundPage() {
  return (
    <div className={cx("not-found")}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;
