import Routes from './src/navigations/Routes';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useEffect } from 'react';
import { getUserData } from './src/ultils/credentials';
import { saveUserData } from './src/redux/actions/auth';

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
    <Provider store={store}>
      <Routes/>
      <FlashMessage position="top"/>
    </Provider>
  );
}

