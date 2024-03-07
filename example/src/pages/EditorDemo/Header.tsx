import { langs } from '@/components/Editor/extensions/langs';
import { Box, Button, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { iLang } from '.';
import { PlayArrow as PlayArrowIcon, Share as ShareIcon } from '@mui/icons-material';

interface Props {
  mode: iLang;
  setMode: (v: iLang) => void;
  handleLangChange: (v: iLang) => void;
  handleRunCode: () => void;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
//   };
// }
const Header: React.FC<Props> = (props) => {
  const { mode, setMode, handleLangChange, handleRunCode } = props;
  // const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<iLang>) => {
    const {
      target: { value }
    } = event;
    setMode(value as iLang);
    handleLangChange(value as iLang);
  };

  const handleClick = () => {
    handleRunCode();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Select
          size="small"
          displayEmpty
          value={mode}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Lang</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}>
          {Object.keys(langs)
            .sort()
            .map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleClick}
          sx={{ width: 115, height: 72, fontSize: 20, borderRadius: '10px', color: '#6CD97E', bgcolor: '#055914' }}>
          <PlayArrowIcon />
          Run
        </Button>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
        <ShareIcon />
      </Box>
    </Box>
  );
};
export default Header;
