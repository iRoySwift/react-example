import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  width: 100%;
`;

export const MarkdownDocument = styled('div')`
  margin: 0 auto;
  text-align: left;
  max-width: 995px;
  overflow: auto;
  padding: 16px;
  border-radius: 5px;
`;

export const Tools = styled('div')`
  margin: 0 auto;
  max-width: 995px;
  padding: 15px 0 0 0;
  > label {
    margin-right: 15px;
  }
`;
