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
  return (
    <View
      style={[
        styles.base,
        variant === 'outset' ? styles.outset : styles.inset,
        borderRadius !== undefined ? { borderRadius } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#F9F5F7',
  },
  outset: {
    shadowColor: '#E5BCBE',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 10, height: 10 },
    elevation: 8,
  },
  inset: {
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    backgroundColor: '#FFFFFF',
  },
});
