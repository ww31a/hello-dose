import { StyleSheet } from 'react-native';
import { Typography } from '../../theme';

const styles = StyleSheet.create({
  tagContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default styles;
