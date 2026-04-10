import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

type DepthShiftPressableProps = Omit<TouchableOpacityProps, 'style'> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
};

export function DepthShiftPressable({ children, style, onPressIn, onPressOut, borderRadius = 16, ...rest }: DepthShiftPressableProps) {
  const pressed = React.useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      style={[
        {
          shadowColor: '#A88589',
          shadowOpacity: pressed.interpolate({
            inputRange: [0, 1],
            outputRange: [0.18, 0.04],
          }),
          shadowRadius: pressed.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 2],
          }),
          shadowOffset: { width: 4, height: 5 },
          transform: [
            {
              scale: pressed.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.988],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        {...rest}
        activeOpacity={1}
        onPressIn={event => {
          Animated.timing(pressed, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
          }).start();
          onPressIn?.(event);
        }}
        onPressOut={event => {
          Animated.timing(pressed, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }).start();
          onPressOut?.(event);
        }}
        style={[styles.touch, { borderRadius }, style]}
      >
        <View style={[styles.innerShade, { borderRadius }]} />
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touch: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  innerShade: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.05)',
  },
});
