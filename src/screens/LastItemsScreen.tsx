import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {};

const LastItemsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>LastItemScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LastItemsScreen;
