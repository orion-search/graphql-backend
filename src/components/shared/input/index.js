import styled from "@emotion/styled";

const Input = styled("input")`
  background: transparent;
  border: 2px solid ${(props) => props.theme.colors.white};
  display: flex;
  width: 100%;
  box-sizing: border-box;

  font-size: ${(props) => props.theme.type.sizes.small};

  color: ${(props) => props.theme.colors.white};
  outline-width: 0;
  border-width: 0 0 2px 0;
  padding: ${(props) => `calc(${props.theme.spacing.normal} / 2)`}
    ${(props) => props.theme.spacing.small}
    ${(props) => `calc(${props.theme.spacing.normal} / 2)`} 0;
`;

export default Input;
