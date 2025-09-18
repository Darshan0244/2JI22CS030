import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Chip,
  IconButton
} from '@mui/material';
import { ContentCopy, Launch } from '@mui/icons-material';
import { isExpired } from '../utils/urlUtils';

const UrlResult = ({ urlData, onRedirect }) => {
  const { originalUrl, shortUrl, shortcode, expiryTime } = urlData;
  const expired = isExpired(expiryTime);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleRedirect = () => {
    if (!expired) {
      onRedirect(shortcode);
    }
  };

  return (
    <Card sx={{ mb: 2, opacity: expired ? 0.6 : 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div">
            {shortcode}
          </Typography>
          <Chip 
            label={expired ? 'Expired' : 'Active'} 
            color={expired ? 'error' : 'success'} 
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Original: {originalUrl}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Short URL: {shortUrl}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Expires: {new Date(expiryTime).toLocaleString()}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ContentCopy />}
            onClick={handleCopy}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<Launch />}
            onClick={handleRedirect}
            disabled={expired}
          >
            Visit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UrlResult;