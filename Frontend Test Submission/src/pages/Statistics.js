import React, { useContext } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Box
} from '@mui/material';
import { UrlContext } from '../App';
import { isExpired } from '../utils/urlUtils';

const Statistics = () => {
  const { urls } = useContext(UrlContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        URL Statistics
      </Typography>
      
      {urls.length === 0 ? (
        <Typography color="text.secondary">
          No URLs have been shortened yet.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expires</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => {
                const expired = isExpired(url.expiryTime);
                return (
                  <TableRow key={url.id}>
                    <TableCell>
                      <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {url.originalUrl}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary">
                        {url.shortUrl}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {url.clicks}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={expired ? 'Expired' : 'Active'} 
                        color={expired ? 'error' : 'success'} 
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(url.expiryTime).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Statistics;