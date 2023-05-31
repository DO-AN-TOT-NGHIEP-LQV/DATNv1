import Routes from "./src/navigations/Routes";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { useEffect } from "react";
import { getStorageTokenUserData } from "./src/ultils/credentials";
import { saveUserData } from "./src/redux/actions/auth";
import { StatusBar, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  useEffect(() => {
    (async () => {
      const tokenData = await getStorageTokenUserData();
      if (!!tokenData) {
        console.log("lai ren lai");
        await saveUserData(tokenData);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Provider store={store}>
          <MenuProvider>
            <Routes />
          </MenuProvider>
        </Provider>
      </View>

      {/* <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </View> */}
    </>
  );
}
