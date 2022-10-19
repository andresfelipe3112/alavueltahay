import * as React from 'react';
import {NativeBaseProvider} from 'native-base';

import TabBottom from '../BottomTab';
import AppNavigator from '../StackTabs';

const RootApp = () => (
  <NativeBaseProvider>
    <AppNavigator TabBottom={TabBottom} />
  </NativeBaseProvider>
);

export default RootApp;
