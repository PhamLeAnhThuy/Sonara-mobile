import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type NeumorphicVariant = 'outset' | 'inset';

interface NeumorphicViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant: NeumorphicVariant;
  borderRadius?: number;
}

export function NeumorphicView({
  children,
  style,
  variant,
  borderRadius,
}: NeumorphicViewProps) {
  const radiusStyle = borderRadius !== undefined ? { borderRadius } : null;

  return (
    <View
      style={[
        styles.base,
        radiusStyle,
        variant === 'outset' ? styles.outset : styles.inset,
        style,
      ]}
    >
      {variant === 'outset' ? (
        <>
          <View pointerEvents="none" style={[styles.outsetHighlight, radiusStyle]} />
          <View pointerEvents="none" style={[styles.outsetShade, radiusStyle]} />
        </>
      ) : null}

      {variant === 'inset' ? (
        <>
          <View pointerEvents="none" style={[styles.insetHighlight, radiusStyle]} />
          <View pointerEvents="none" style={[styles.insetShade, radiusStyle]} />
        </>
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#F9F5F7',
  },
  outset: {
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.14)',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.95,
    shadowRadius: 20,
    shadowOffset: { width: 10, height: 10 },
    elevation: 8,
  },
  inset: {
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.14)',
    backgroundColor: '#FFFFFF',
  },
  outsetHighlight: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.82)',
  },
  outsetShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(109, 86, 88, 0.12)',
    borderRightColor: 'rgba(109, 86, 88, 0.12)',
  },
  insetHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: 'rgba(109, 86, 88, 0.14)',
    borderLeftColor: 'rgba(109, 86, 88, 0.14)',
  },
  insetShade: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.82)',
    borderRightColor: 'rgba(255, 255, 255, 0.82)',
  },
});
