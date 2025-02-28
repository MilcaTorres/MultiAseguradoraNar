import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import Login from './src/modules/Login'; 


SplashScreen.preventAutoHideAsync();

export default function App() {
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

  
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 500,
    height: 500,
  },
});