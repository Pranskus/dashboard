import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    // Add your theme properties here if you're using a theme
    colors?: {
      primary?: string;
      secondary?: string;
      background?: string;
    };
  }
}
