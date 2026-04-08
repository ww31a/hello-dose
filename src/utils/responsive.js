import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => (
  size + (scale(size) - size) * factor
);

export const normalizeFont = (size, factor = 0.35) => {
  const scaled = moderateScale(size, factor);
  const fontScale = PixelRatio.getFontScale();
  const adjusted = scaled / Math.min(fontScale, 1.2);
  return Math.round(PixelRatio.roundToNearestPixel(adjusted));
};
