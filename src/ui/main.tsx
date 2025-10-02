import router from '@core/router/router';
import routes from '@core/router/routes';
import stacks from '@core/router/stacks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { navigationRef } from '../core/utils/helpers';
import { AppTheme } from '../core/styles/theme';

const Stack = createNativeStackNavigator();

function RootStack() {
  let sharePage = router.filter(item => item.stack === stacks.ONBOARDING);
  let appPage = router.filter(item => item.stack === stacks.APP);

  return (
    <Stack.Navigator
      initialRouteName={routes.splash}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right', // This enables slide animation
      }}
    >
      {[...sharePage, ...appPage].map(item => {
        return (
          <Stack.Screen
            key={item.route}
            name={item?.route}
            component={item?.screen}
          />
        );
      })}
    </Stack.Navigator>
  );
}
const MainUi = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={AppTheme}>
      <RootStack />
    </NavigationContainer>
  );
};

export default MainUi;

