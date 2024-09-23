import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  WithTimingConfig,
  Easing,
} from "react-native-reanimated";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";

const timingInConfig: WithTimingConfig = {
  duration: 1000,
  easing: Easing.in(Easing.cubic),
};
const timingOutConfig: WithTimingConfig = {
  duration: 1000,
  easing: Easing.out(Easing.cubic),
};

export function Skeleton(p: { style?: StyleProp<ViewStyle> }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, timingInConfig),
        withTiming(1, timingOutConfig),
      ),
      -1,
      true,
    );
  }, [opacity]);

  return <Animated.View style={[{ opacity }, p.style]} />;
}

export function SkeletonText({ width = "75%" }: { width?: DimensionValue }) {
  return (
    <Skeleton
      style={{
        width,
        marginVertical: 1,
        height: 16,
        borderRadius: 999,
        backgroundColor: "gray",
      }}
    />
  );
}
