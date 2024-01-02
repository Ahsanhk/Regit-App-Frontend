import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from './color';

const Container = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
});

export default Container;