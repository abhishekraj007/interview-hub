import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../stores";
import { apiAddUser, apiGetUserData, apiLogInWithGoogle } from "../../apis";
import { Button, Modal } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const LoginModal = () => {
  const { authStore } = useContext(StoreContext);

  const { setUser, setIsLoggedIn, showLoginModal, setShowLoginModal } =
    authStore;
  // const { width } = useWindowDimensions();
  const [isMakingCall, setIsMakingCall] = useState(false);

  const onLogin = async () => {
    try {
      setIsMakingCall(true);
      // Authenticate using Google
      const res = await apiLogInWithGoogle();
      const newUser = {
        id: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
      };

      // Update state
      setUser(newUser);
      setIsLoggedIn(true);

      const userSnap = await apiGetUserData(newUser.id);

      // Check if this user exist
      if (userSnap.exists()) {
        // TODO: Can we use to reload page
        // setUserFavs(userSnap?.data()?.favs, getCategory(selectedMenu));
        window.location.reload();
      } else {
        // Add this user to database
        await apiAddUser(newUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
      setShowLoginModal(false);
    }
  };

  return (
    <Modal
      title="Login"
      visible={showLoginModal}
      footer={false}
      onCancel={() => setShowLoginModal(false)}
      bodyStyle={{
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <Button
        loading={isMakingCall}
        onClick={onLogin}
        icon={<GoogleOutlined />}
        block
        size="large"
      >
        Login with Google
      </Button>
    </Modal>
  );
};

export default observer(LoginModal);
