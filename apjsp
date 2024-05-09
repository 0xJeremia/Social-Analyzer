import React, { useEffect } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';

const App = () => {
  useEffect(() => {
    // Subscribe to app state changes
    AppState.addEventListener('change', handleAppStateChange);

    // Clean up the subscription on unmount
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (newState) => {
    if (newState === 'background') {
      // Perform necessary background tasks
      // e.g., save data, stop timers, etc.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <Text style={styles.subtitle}>Welcome to my app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
  },
});

export default App;
