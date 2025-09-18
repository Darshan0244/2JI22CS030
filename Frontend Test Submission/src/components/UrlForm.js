import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert,
  Chip
} from '@mui/material';
import { isValidUrl, isValidShortcode } from '../utils/urlUtils';

const UrlForm = ({ onSubmit, existingShortcodes }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    const validityMinutes = validity ? parseInt(validity) : 30;
    if (validity && (isNaN(validityMinutes) || validityMinutes <= 0)) {
      setError('Validity must be a positive integer (minutes)');
      return;
    }

    if (shortcode && !isValidShortcode(shortcode)) {
      setError('Shortcode must contain only alphanumeric characters');
      return;
    }

    if (shortcode && existingShortcodes.includes(shortcode)) {
      setError('Shortcode already exists. Please choose a different one.');
      return;
    }

    onSubmit({ url, validity: validityMinutes, shortcode });
    setUrl('');
    setValidity('');
    setShortcode('');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Original URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Validity (minutes)"
                type="number"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                placeholder="30"
                sx={{ flex: 1 }}
              />
              <TextField
                label="Custom Shortcode (optional)"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                placeholder="mylink"
                sx={{ flex: 1 }}
              />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" size="large">
              Shorten URL
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlForm;