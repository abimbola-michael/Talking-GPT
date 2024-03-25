import { isDarkMode } from "./utils/utils";

export const black = "rgb(0, 0, 0)";
export const lightBlack = "rgb(0, 0, 0, 0.8)";
export const lighterBlack = "rgb(0, 0, 0, 0.5)";
export const lightestBlack = "rgb(0, 0, 0, 0.1)";

export const white = "rgb(255, 255, 255)";
export const lightWhite = "rgb(255, 255, 255, 0.8)";
export const lighterWhite = "rgb(255, 255, 255, 0.5)";
export const lightestWhite = "rgb(255, 255, 255, 0.1)";

export const tint = isDarkMode ? white : black;
export const tintLight = isDarkMode ? lightWhite : lightBlack;
export const tintLighter = isDarkMode ? lighterWhite : lighterBlack;
export const tintLightest = isDarkMode ? lightestWhite : lightestBlack;

export const onTint = isDarkMode ? black : white;

export const appBgColor = isDarkMode ? "#121212" : "#ffffff";
export const primaryColor = "#ff4500";
