import { moderateScale, normalizeFont } from '../utils/responsive';

export const Colors = {
  primary: '#0D9488', // Teal
  dark: '#1E1E26',    // Dark background/text
  surface: '#F0FDFA', // Light teal surface
  background: '#F2F2F7', // App background
  white: '#FFFFFF',
  gray: '#E5E5EA',
  muted: '#8E8E93',
  border: '#E5E5EA',
  outlineGray: '#D1D1D6',
  tabActive: '#1E1E26',
  tabInactive: '#94A3B8',
  tabBackground: '#FFFFFF',
};

export const Spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(20),
  xxl: moderateScale(24),
};

export const Radius = {
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(24),
  pill: moderateScale(28),
  full: 999,
};

export const Typography = {
  fontFamily: {
    regular: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semiBold: 'PlusJakartaSans-SemiBold',
    bold: 'PlusJakartaSans-Bold',
    extraBold: 'PlusJakartaSans-ExtraBold',
    logo: 'Jazmin-Regular',
  },
  size: {
    xs: normalizeFont(10),
    sm: normalizeFont(12),
    md: normalizeFont(14),
    lg: normalizeFont(16),
    xl: normalizeFont(18),
    xxl: normalizeFont(20),
    title: normalizeFont(24),
  },
};
