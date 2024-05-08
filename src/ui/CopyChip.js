import ContentCopy from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

const CopyChip = ({ style, title, label, placement = 'top' }) => {
  const [copied, setCopied] = React.useState(false);

  if (!label) {
    return null;
  }

  return (
    <Box
      style={style}
      sx={{
        'display': 'flex',
        'alignItems': 'center',
        '.copy-icon': {
          visibility: 'hidden',
        },
        '&:hover .copy-icon': {
          visibility: 'visible',
        },
      }}
    >
      <Tooltip title={title === label ? '' : title} placement={placement} arrow={true}>
        <Box
          sx={{
            padding: '2px 6px',
            fontFamily: '"Ubuntu Mono", "Courier New", monospace !important',
            backgroundColor: 'rgb(249, 242, 244)',
            color: 'rgb(199, 37, 78)',
          }}
        >
          {label}
        </Box>
      </Tooltip>

      <Tooltip title={copied ? 'Copied' : ''} placement='top' arrow={true}>
        <ContentCopy
          className='copy-icon'
          sx={{ cursor: 'pointer', width: '13px', marginLeft: '4px' }}
          onClick={() => {
            navigator.clipboard.writeText(title);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default CopyChip;
