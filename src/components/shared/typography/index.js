/** @jsx jsx */
import styled from "@emotion/styled";

export const placeholderText = `There are many kinds of narratives and organizing principles. Science is driven by evidence gathered in experiments, and by the falsification of extant theories and their replacement with newer, asymptotically truer, ones. Other systems – religion, nationalism, paranoid ideation, or art – are based on personal experiences (faith, inspiration, paranoia, etc.).`;

export const placeholderTitleText = `Althusser Competing Interpellations And The Third Text`;

export const Header = styled(`h2`)`
  margin: 0;
  color: ${(props) => props.theme.colors.orange};
`;

export const Subheader = styled(`h3`)`
  margin-bottom: ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.colors.orange};
`;
