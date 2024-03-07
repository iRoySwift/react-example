import { Box, Button, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
let url = 'https://gcore.jsdelivr.net/pyodide/v0.21.2/full/repodata.json';
type iRepodata = {
  name: string;
  version: string;
  file_name: string;
  install_dir: string;
  sha256: string;
  depends: [];
  imports: string[];
};

interface Props {
  setDependent: (value: string[]) => void;
}
const Footer: React.FC<Props> = (props) => {
  const { setDependent } = props;
  const [selected, setSelected] = useState<string[]>([]);
  const [repodata, setRepodata] = useState<iRepodata[]>([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let packages = data.packages;
        let arr: iRepodata[] = [];
        Object.keys(packages).forEach((item) => {
          arr.push(packages[item]);
        });
        setRepodata(arr);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value }
    } = event;
    setSelected(typeof value === 'string' ? value.split(',') : value);
    // console.log('🚀 ~ file: Footer.tsx:51 ~ handleChange ~ setSelected:', setSelected, value);
  };

  const handleClick = () => {
    setDependent(selected);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        size="small"
        displayEmpty
        MenuProps={MenuProps}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Packages</em>;
          }
          return selected.join(',');
        }}
        inputProps={{ 'aria-label': 'Without label' }}>
        {repodata.map((repo) => (
          <MenuItem key={repo.name} value={repo.name}>
            {repo.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="text" onClick={handleClick}>
        安装
      </Button>
    </Box>
  );
};
export default Footer;
