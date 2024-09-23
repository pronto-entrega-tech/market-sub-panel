import { StyleSheet } from "react-native";
import { myColors } from "./myColors";
import { device, notchHeight } from "./device";

export const globalStyles = StyleSheet.create({
  centralizer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notch: {
    marginTop: notchHeight,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 66,
  },
  bottomButton: {
    backgroundColor: "white",
    position: "absolute",
    alignSelf: "center",
    height: 46,
    minWidth: 210,
    // MyButton overwrite paddingHorizontal
    paddingLeft: 24,
    paddingRight: 24,
    bottom: device.iPhoneNotch ? 38 : 12,
    borderWidth: 2,
  },
  darkBorder: {
    borderWidth: 0,
    borderColor: myColors.divider,
  },
  elevation1: {
    elevation: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  elevation2: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  elevation3: {
    elevation: 3,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  elevation4: {
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  elevation5: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
