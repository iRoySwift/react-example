import styled from '@emotion/styled';
import { FC, PropsWithChildren } from 'react';

const Label = styled.label`
  user-select: none;
  white-space: nowrap;
`;

export const Options: FC<PropsWithChildren<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>> = ({
  children,
  ...props
}) => {
  return (
    <Label>
      <input type="checkbox" {...props} />
      <span>{children}</span>
    </Label>
  );
};
