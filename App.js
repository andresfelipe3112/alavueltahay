import * as React from "react";

import { LogBox } from "react-native";

/** Import Stores */
import StoreContext from "./src/helpers/globalStates";

/** Import Components */
import RootApp from "./src/navigation/RootApp";

export default function App() {
  /** Ignore Yellow Box Warning */
  LogBox.ignoreAllLogs();

  return (
    <StoreContext.UserProvider>
      <StoreContext.SecurityProvider>
        <StoreContext.EntrepreneurProvider>
          <RootApp />
        </StoreContext.EntrepreneurProvider>
      </StoreContext.SecurityProvider>
    </StoreContext.UserProvider>
  );
}
