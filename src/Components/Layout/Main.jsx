import { ConfigProvider } from "antd";
import { mainTheme } from "../../theme";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import router from "../../Routes/Routes";
import { RouterProvider } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <ConfigProvider theme={mainTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </div>
  );
};

export default Main;
