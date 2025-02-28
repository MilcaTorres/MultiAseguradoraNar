import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { InriaSerif_400Regular, InriaSerif_700Bold } from "@expo-google-fonts/inria-serif";
import Login from './src/modules/Login';
import { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AppColors from './src/kernel/AppColors';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
       
        await new Promise(resolve => setTimeout(resolve, 3000)); 
      } catch (e) {
        console.warn(e);
      } finally {
    
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
  
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; 
  }

  if (!animationFinished) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <LottieView
          source={require('./src/Lotties/logoBlanco2.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => setAnimationFinished(true)}
          style={styles.animation}
        />
      </View>
    );
  }


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        InriaSerif_Regular: InriaSerif_400Regular,
        InriaSerif_Bold: InriaSerif_700Bold,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <Login />
    </View>
  );

  // return (
  //   <NavigationContainer>
  //     <BottomTabNavigator />
  //     <StatusBar style="light" />
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 500,
    height: 500,
  }
});