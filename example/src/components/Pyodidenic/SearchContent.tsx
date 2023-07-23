import { DeleteOutline as DeleteOutlineIcon, Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, IconButton, OutlinedInput, styled } from '@mui/material';
// import { inputTypes } from 'blockly';
import React, { useState } from 'react';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'absolute',
  right: 0,
  '& button': {
    marginLeft: 2,
    fontSize: 12
  }
});
const InputFind = styled(OutlinedInput)({
  width: 85,
  height: 24,
  color: '#F5F9FC',
  fontSize: 14,
  '& input::placeholder': {
    color: '#fff'
  }
});
const btnStyle = { color: '#F5F9FC', background: '#0E1525', borderRadius: 1, height: 22, minWidth: 'unset', textTransform: 'none' };

interface Props {
  setPyodideOutput?: (v: string) => void;
}
const SearchContent: React.FC<Props> = (props) => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');

  const { setPyodideOutput } = props;

  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event;
    setSearch(value);
  };

  const handleSearchClick = () => {
    setIsSearch(true);
  };

  const handleExitClick = () => {
    setIsSearch(false);
  };

  const handleClearClick = () => {
    setPyodideOutput!('');
  };

  return (
    <Container>
      {isSearch ? (
        <Box>
          <InputFind value={search} onChange={handleChange} size="small" placeholder="Find" sx={{}} />
          <Button sx={btnStyle} size="small">
            Next
          </Button>
          <Button sx={btnStyle} size="small">
            Previous
          </Button>
          <Button onClick={handleExitClick} sx={btnStyle} size="small">
            Exit
          </Button>
        </Box>
      ) : (
        <IconButton onClick={handleSearchClick} size="small" sx={{ ...btnStyle, width: 24, height: 24 }} aria-label="search">
          <SearchIcon fontSize="small" sx={{ fontSize: 14 }} />
        </IconButton>
      )}

      <IconButton onClick={handleClearClick} size="small" sx={{ ...btnStyle, width: 24, height: 24 }} aria-label="delete">
        <DeleteOutlineIcon fontSize="small" sx={{ fontSize: 14 }} />
      </IconButton>
    </Container>
  );
};
export default SearchContent;
