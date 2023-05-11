import Routes from './src/navigations/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useEffect } from 'react';
import { getUserData } from './src/ultils/credentials';
import { saveUserData } from './src/redux/actions/auth';
import { StatusBar, View } from 'react-native';
import Color from './src/constans/Color';

export default function App() {

  useEffect(()=>{
    (async()=> {
      const userData = await getUserData();
      if(!!userData){
        console.log('lai ren lai')
        await saveUserData(userData)
      } 
    })()}, []) 

  return (
    
    <>
    {/* <StatusBar  barStyle="dark-content"  /> */}
    <StatusBar barStyle= 'default'/>
    <View style={{ flex: 1}}>
        <Provider store={store}>
          <Routes/>
        </Provider>
    </View>
    </>


    // {/* <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
    //     <Provider store={store}>
    //       <Routes/>
    //     </Provider>
    // </View> */}

  );
}

