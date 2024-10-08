import React from "react";
import { Text, TextProps } from "react-native";
import { myColors } from "~/constants/myColors";

const MyText = ({ style, ...props }: TextProps) => (
  <Text {...props} style={[{ color: myColors.text7 }, style]} />
);

export default MyText;
