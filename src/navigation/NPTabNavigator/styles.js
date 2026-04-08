import { StyleSheet, Platform } from 'react-native';
import { Colors, Typography } from '../../theme';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: Platform.OS === 'ios' ? 150 : 120,
    paddingBottom: Platform.OS === 'ios' ? 40 : 35,
    paddingTop: 12,
    borderTopWidth: 0,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 20,
  },
  tabBarLabel: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
