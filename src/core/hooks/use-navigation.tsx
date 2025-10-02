import { navigate, navigationRef, reset } from '@core/utils/helpers';
import { NavigationProp } from '@react-navigation/native';

export const useNavigate = () => {
  const navigation = navigationRef.current as NavigationProp<any>;

  const handleNavigate = <T extends object>(route: string, params?: T) => {
    return navigate(route, params);
  };

  const resetNavigation = (route: string, params?: object) => {
    return reset([{ name: route, params }], 0);
  };

  return { handleNavigate, resetNavigation };
};
