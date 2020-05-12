import { css } from "@emotion/core";
import facepaint from "facepaint";

const typeUnit = "rem";
const typeBaseSize = 1;

const spacingUnit = "rem";
const spacingBaseSize = 1;

const typeSize = {
  tiny: `${typeBaseSize * 0.66}${typeUnit}`,
  small: `${typeBaseSize * 0.875}${typeUnit}`,
  normal: `${typeBaseSize}${typeUnit}`,
  large: `${typeBaseSize * 1.125}${typeUnit}`,
  huge: `${typeBaseSize * 1.75}${typeUnit}`,
};

const typeStyle = {
  small: css`
    font-size: ${typeSize.small};
    font-weight: normal;
  `,
  normal: css`
    font-size: ${typeSize.normal};
    font-weight: normal;
  `,
  large: css`
    font-size: ${typeSize.large};
    font-weight: normal;
  `,
  huge: css`
    font-size: ${typeSize.huge};
    font-weight: heavy;
  `,
};

const colors = {
  black: `#0c0c0c`,
  white: `#ffffff`,
};

const breakpoints = [576, 992, 1200];

// media queries
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export default {
  breakpoints,
  mq,
  colors: {
    ...colors,
  },

  type: {
    fonts: {
      regular: "Matter",
    },
    sizes: typeSize,
    style: typeStyle,
  },

  spacing: {
    none: 0,
    tiny: `${spacingBaseSize * 0.25}${spacingUnit}`,
    small: `${spacingBaseSize * 0.5}${spacingUnit}`,
    normal: `${spacingBaseSize}${spacingUnit}`,
    large: `${spacingBaseSize * 1.5}${spacingUnit}`,
    huge: `${spacingBaseSize * 2}${spacingUnit}`,
  },
};
