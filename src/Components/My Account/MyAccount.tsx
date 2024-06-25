import Header from "../Reusable Components/Header";

const MyAccount = () => {
  return (
    <>
      <Header />
      <div>
        <div>
          <div>Old Password</div>
          <input />
        </div>
        <div>
          <div>New Password</div>
          <input />
        </div>
        <div>
          <div>Confirm New Password </div>
          <input />
        </div>
      </div>
    </>
  );
};

export default MyAccount;
