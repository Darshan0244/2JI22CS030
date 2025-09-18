import React, { useState, useContext } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import { UrlContext } from '../App';
import { generateShortcode } from '../utils/urlUtils';
import Logger from '../utils/logger';

const UrlShortener = () => {
  const { urls, setUrls } = useContext(UrlContext);
  const [error, setError] = useState('');

  const handleUrlSubmit = ({ url, validity, shortcode }) => {
    if (urls.length >= 5) {
      setError('Maximum 5 URLs can be shortened concurrently');
      Logger.log('URL_SHORTENING_FAILED', { reason: 'Maximum limit reached', url });
      return;
    }

    const finalShortcode = shortcode || generateShortcode();
    const expiryTime = new Date(Date.now() + validity * 60 * 1000).toISOString();
    const shortUrl = `http://localhost:3000/${finalShortcode}`;

    const newUrl = {
      id: Date.now(),
      originalUrl: url,
      shortUrl,
      shortcode: finalShortcode,
      expiryTime,
      clicks: 0,
      createdAt: new Date().toISOString()
    };

    setUrls(prev => [...prev, newUrl]);
    setError('');
    Logger.log('URL_SHORTENED', { originalUrl: url, shortcode: finalShortcode, validity });
  };

  const handleRedirect = (shortcode) => {
    const urlData = urls.find(u => u.shortcode === shortcode);
    if (urlData) {
      setUrls(prev => prev.map(u => 
        u.shortcode === shortcode ? { ...u, clicks: u.clicks + 1 } : u
      ));
      Logger.log('URL_REDIRECTED', { shortcode, originalUrl: urlData.originalUrl });
      window.open(urlData.originalUrl, '_blank');
    }
  };

  const existingShortcodes = urls.map(u => u.shortcode);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Shortener
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <UrlForm onSubmit={handleUrlSubmit} existingShortcodes={existingShortcodes} />
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shortened URLs ({urls.length}/5)
        </Typography>
        {urls.length === 0 ? (
          <Typography color="text.secondary">No URLs shortened yet.</Typography>
        ) : (
          urls.map(urlData => (
            <UrlResult 
              key={urlData.id} 
              urlData={urlData} 
              onRedirect={handleRedirect}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default UrlShortener;