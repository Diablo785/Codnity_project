import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface TailedBeastCardProps {
  tailedBeast: any; 
}

const brokenImagePlaceholder = 'https://static.wikia.nocookie.net/naruto/images/2/21/Profile_Jiraiya.png';

const TailedBeastCard: React.FC<TailedBeastCardProps> = ({ tailedBeast }) => {
  const imageSrc = tailedBeast.images?.[0] || brokenImagePlaceholder;

  return (
    <Link to={`/characters/${tailedBeast.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        sx={{
          height: '100%',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#fdfdfd',
        }}
      >
        <CardContent>
          <img
            src={imageSrc}
            alt={tailedBeast.name}
            loading="lazy"
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = brokenImagePlaceholder;
            }}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <Typography variant="h5" component="div" gutterBottom sx={{ marginTop: 1 }}>
            {tailedBeast.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Debut (Manga):</strong> {tailedBeast.debut?.manga || 'none'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Debut (Anime):</strong> {tailedBeast.debut?.anime || 'none'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Affiliation:</strong>{' '}
            {Array.isArray(tailedBeast.personal?.affiliation)
              ? tailedBeast.personal.affiliation.join(', ')
              : tailedBeast.personal?.affiliation || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Kekkei Genkai:</strong> {tailedBeast.personal?.kekkeiGenkai || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Status:</strong> {tailedBeast.personal?.status || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Jinchūriki:</strong> {tailedBeast.personal?.jinchūriki?.join(', ') || 'none'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Unique Traits:</strong> {tailedBeast.uniqueTraits?.join(', ') || 'none'}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TailedBeastCard;
