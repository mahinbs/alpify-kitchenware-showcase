import React from 'react';

// Dark mode context
export const DarkModeContext = React.createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  toggleDarkMode: () => {},
});
