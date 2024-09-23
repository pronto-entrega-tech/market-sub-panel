import { Dimensions, Platform, StatusBar } from "react-native";

const android = Platform.OS === "android";
const iOS = Platform.OS === "ios";

const iPad = Platform.OS === "ios" && Platform.isPad;

const { height, width } = Dimensions.get("window");
const aspectRatio = height / width;

// https://blog.calebnance.com/development/iphone-ipad-pixel-sizes-guide-complete-list.html
// iPhoneX, iPhoneXs, iPhoneXr, iPhoneXs Max, iPhone 11 & 12
const iPhoneNotch =
  iOS && (height === 812 || height === 844 || height === 896 || height === 926);

export const notchHeight = android
  ? (StatusBar.currentHeight ?? 0)
  : iPhoneNotch
    ? 34
    : 0;

export const device = {
  android,
  aspectRatio,
  height,
  iOS,
  iPhoneNotch,
  iPad,
  width,
};
