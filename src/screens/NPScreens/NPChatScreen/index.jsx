import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const NPChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NP Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 24,
    color: Colors.dark,
  },
});

export default NPChatScreen;
