import React from 'react';
import { StyleSheet, View } from 'react-native';

import Route from './routes';

const App = ():JSX.Element => {
  const { container } = styles;
  return (
    <View style={container}>
      <Route />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
