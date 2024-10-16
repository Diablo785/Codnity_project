import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  character: any;
}

const brokenImagePlaceholder = 'https://static.wikia.nocookie.net/naruto/images/2/21/Profile_Jiraiya.png';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const getGenderDisplay = (gender: string | undefined) => {
    if (!gender) return 'Unknown';
    return gender === 'Male' || gender === 'Female' ? gender : 'Various';
  };

  const getAgeDisplay = (age: any) => {
    if (!age) return 'Unknown';
    if (typeof age === 'object' && age !== null) {
      return Object.entries(age)
        .map(([context, ageValue]) => `${ageValue} (${context})`)
        .join(', ') || 'Unknown';
    }
    return age.toString() || 'Unknown';
  };

  const imageSrc = character.images?.[0] || brokenImagePlaceholder;

  return (
    <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            alt={character.name}
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
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Debut (Anime):</strong> {character.debut?.anime || 'none'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Affiliation:</strong>{' '}
            {Array.isArray(character.personal?.affiliation)
              ? character.personal.affiliation.join(', ')
              : character.personal?.affiliation || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Clan:</strong> {character.personal?.clan || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Birthdate:</strong> {character.personal?.birthdate || 'unknown'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Gender:</strong> {getGenderDisplay(character.personal?.sex)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Age:</strong> {getAgeDisplay(character.personal?.age)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CharacterCard;
