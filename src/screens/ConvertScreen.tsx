import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {
};

const ConvertScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>ConvertScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConvertScreen;
