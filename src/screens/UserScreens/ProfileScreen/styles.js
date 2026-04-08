import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

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

export default styles;
