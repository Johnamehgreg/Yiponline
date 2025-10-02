import routes from '@core/router/routes';
import { colors } from '@core/styles/colors';
import { navigate } from '@core/utils/helpers';
import { rfs, s } from '@core/utils/scale';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Home, PlusCircle } from 'lucide-react-native';
import React, { useCallback, useEffect } from 'react';
import AddProductUi from '../product/AddProduct.ui';
import ProductsUi from '../product/Products.ui';

const Tab = createBottomTabNavigator();

const DashboardUi = () => {
  const route = useRoute<any>();

  const navigation = useNavigation<any>();

  const propsInitialRoute = route?.params?.initial || '';

  useEffect(() => {
    if (propsInitialRoute) {
      navigate(propsInitialRoute);
      navigation.setParams({
        initial: null,
      });
    }
  }, [route, propsInitialRoute]);

  const bottomNavList = useCallback(() => {
    return [
      {
        name: routes.products,
        screen: ProductsUi,
        icon: (active: boolean) => (
          <Home color={active ? colors.primary : colors.text} />
        ),
      },
      {
        name: routes.addProduct,
        screen: AddProductUi,
        icon: (active: boolean) => (
          <PlusCircle color={active ? colors.primary : colors.text} />
        ),
      },
    ];
  }, []);

  const bottomNav = bottomNavList();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 0,
          height: s(70),
          paddingBottom: s(10),
          paddingTop: s(10),
        },
        tabBarItemStyle: {
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginBottom: s(4),
        },
        tabBarLabelStyle: {
          fontSize: rfs(12),
          fontWeight: '500',
          textTransform: 'capitalize',
          marginBottom: s(5),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
      }}
      initialRouteName={routes.products}
    >
      {bottomNav.map(item => (
        <Tab.Screen
          listeners={() => ({
            tabPress: e => {},
          })}
          key={item.name}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => item.icon(focused),
          }}
          name={item.name}
          component={item.screen}
        />
      ))}
    </Tab.Navigator>
  );
};
export default DashboardUi;

