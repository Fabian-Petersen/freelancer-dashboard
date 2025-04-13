import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#0FEE0F" },
        secondary: { value: "#EE0F0F" },
        bgDark: { value: "#101827" },
        bgSecondary: { value: "#1d2739" },
        bgTertiary: { value: "#222e44" },
      },
      borders: {
        dark: { value: "#37415180" },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      shadows: {
        custom: {
          value: {
            _light: "0 32px 56px 0 rgba(0, 0, 0, 0.25)",
            _dark: "0 32px 56px 0 rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
