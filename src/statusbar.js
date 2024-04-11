import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

const StatusBarCustom = () => {
  return (
    <View>
      {Platform.OS === 'android' && <StatusBar backgroundColor="transparent" barStyle="dark-content"/>}
    </View>
  );
};

export default StatusBarCustom;
