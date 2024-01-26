import * as Device from "expo-device";
import * as WebBrowser from "expo-web-browser";

import { InAppBrowser } from "@bundly/ic-react-native";

export const AppBrowser: InAppBrowser = {
  open: (url: string) => {
    WebBrowser.openBrowserAsync(url, { showTitle: false });
  },
  close: () => {
    if (["iOS", "iPadOS"].includes(Device.osName || "")) {
      WebBrowser.dismissBrowser();
    }
  },
};
