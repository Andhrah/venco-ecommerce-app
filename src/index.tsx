import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import Route from './routes';
import store from './store';

const App = ():JSX.Element => {
  const { container } = styles;
  return (
    <Provider store={store}>
      <View style={container}>
        <Route />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
