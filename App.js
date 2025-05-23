import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, LogBox, StyleSheet, View } from 'react-native';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { InriaSerif_400Regular, InriaSerif_700Bold } from "@expo-google-fonts/inria-serif";
import Login from './src/modules/Login';
import { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppColors from './src/kernel/AppColors';
import StackNavigator from './src/navigation/StackNavigator';

// Ignorar warning de defaultProps
LogBox.ignoreLogs([
  'defaultProps will be removed', // cualquier advertencia sobre defaultProps
  'TNodeChildrenRenderer',
  'MemorizedTNodeRenderer',
  'bound renderChildren',
]);


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {  

        // await Font.loadAsync({
        //   InriaSerif_Regular: InriaSerif_400Regular,
        //   InriaSerif_Bold: InriaSerif_700Bold,
        // });
        
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
    <NavigationContainer>
      <StackNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
  );
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