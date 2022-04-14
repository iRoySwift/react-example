import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonPanel = styled.div`
  cursor: pointer;
`;

interface Props {
  className?: string;
  children: ReactNode;
  onMouseOver?: Function;
  onClick?: Function;
}
const Button: React.FC<Props> = ({ className, children, onMouseOver, onClick }) => {
  return (
    <ButtonPanel
      className={className}
      role="button"
      onMouseOver={(event: any) => onMouseOver && onMouseOver(event)}
      onClick={(event: any) => {
        onClick && onClick(event);
      }}>
      {children}
    </ButtonPanel>
  );
};
export default Button;
