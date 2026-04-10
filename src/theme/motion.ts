import { Easing, Vibration } from 'react-native';

export const SONARA_SPRING = {
  stiffness: 300,
  damping: 30,
  mass: 1,
  useNativeDriver: true as const,
};

export const SOFT_REVEAL_EASING = Easing.bezier(0.43, 0.13, 0.23, 0.96);

export const SOFT_REVEAL = {
  duration: 420,
  easing: SOFT_REVEAL_EASING,
  useNativeDriver: true as const,
};

export function triggerMajorHaptic() {
  try {
    Vibration.vibrate(10);
  } catch {
    // No-op if platform/device does not allow vibration.
  }
}
