import { Image } from 'expo-image';
import { Animated, Button, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Restaurant } from '@/types/Restaurant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

export default function HomeScreen() {
  const [user, setUser] = useState<Restaurant | null>(null);
  const colorAnim = useRef(new Animated.Value(0x000000)).current;
  const sizeAnim = useRef(new Animated.Value(10)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const twirl = useRef(new Animated.Value(0)).current;
  const gestureState = { vx: 0.2, vy: 0.2 };  // Placeholder for gesture velocity
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
    Animated.timing(colorAnim, {
      toValue: 0xFF0000, // Red color
      duration: 20000,
      useNativeDriver: false,
    }).start();
    Animated.timing(sizeAnim, {
      toValue: 30,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    Animated.sequence([
      Animated.timing(twirl, { 
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      // decay, then spring to start  and twirl
      Animated.decay(position, {
        // coast to a stop
        velocity: { x: gestureState.vx, y: gestureState.vy }, // velocity from gesture release
        deceleration: 0.997,
        useNativeDriver: true,
      }),
      Animated.parallel([
        // after decay, in parallel:
        Animated.spring(position, {
          delay: 2000,
          toValue: { x: 0, y: 0 }, // return to start
          useNativeDriver: true,
        }),
        Animated.timing(twirl, {
          duration: 2000,
          // and twirl
          toValue: 360,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [colorAnim, sizeAnim, position, twirl, user]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome {user?.username}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Animated.Text style={{
          color: colorAnim.interpolate({
            inputRange: [0x000000, 0xFF0000],
            outputRange: ['#000000', '#FF0000'],
          }), fontSize: sizeAnim
        }}>
          {user?.useremail??'Your email will appear here after login'}
        </Animated.Text>
      </ThemedView>
      <Animated.View style={{
        position: 'absolute',
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          {
            rotate: twirl.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            })
          }
        ]
      }}>
        <ThemedText>FT SD A 6</ThemedText>
      </Animated.View>
      <ThemedView>
        <Button title="Logout" onPress={() => {
          AsyncStorage.removeItem('user').then(() => {
            setUser(null);
            router.replace('/login');
          });
        }} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
