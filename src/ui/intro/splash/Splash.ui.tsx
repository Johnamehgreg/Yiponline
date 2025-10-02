import { useNavigate } from '@core/hooks/use-navigation';
import routes from '@core/router/routes';
import { colors } from '@core/styles/colors';
import { s } from '@core/utils/scale';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Easing,
} from 'react-native';

const SplashUi = () => {
  const { resetNavigation } = useNavigate();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(async () => {
      resetNavigation(routes.dashboard);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.background} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Animated.Text
          style={[styles.title, { transform: [{ scale: scaleAnim }] }]}
        >
          Yiponline
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: s(48),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
});

export default SplashUi;
