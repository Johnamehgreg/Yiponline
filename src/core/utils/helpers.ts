import { CommonActions } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}
export function goBack() {
  navigationRef.current?.goBack();
}

export const isScreenFocused = navigationRef.current?.isFocused();

export function reset(
  routes: Array<{ name: string; params?: any }>,
  index = 0,
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    }),
  );
}
