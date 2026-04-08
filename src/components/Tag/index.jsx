import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// Pre-defined tag styling configuration
const TAG_VARIANTS = {
  'TIRZEPATIDE': { bg: '#7399FA', color: '#E3DDFF' },
  'SEMAGLUTIDE': { bg: '#47BE14', color: '#D8F2C0' },
  'FOLLOW-UP': { bg: '#1E1E26', color: '#FFFFFF' }, // Based on the screenshot for general tags
  // Fallback styling
  'DEFAULT': { bg: '#E5E7EB', color: '#4B5563' },
};

const Tag = ({ label, bgStyle, textStyle }) => {
  // Normalize label to match variants, otherwise fallback
  const upLabel = label ? label.toUpperCase() : '';
  const variant = TAG_VARIANTS[upLabel] || TAG_VARIANTS.DEFAULT;

  // Allow custom overrides via bgStyle and textStyle props if we want to bypass variants later
  const backgroundColor = bgStyle || variant.bg;
  const textColor = textStyle || variant.color;

  return (
    <View style={[styles.tagContainer, { backgroundColor }]}>
      <Text style={[styles.tagText, { color: textColor }]}>
        {upLabel}
      </Text>
    </View>
  );
};

export default Tag;
