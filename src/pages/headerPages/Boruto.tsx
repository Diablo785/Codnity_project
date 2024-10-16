import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface BorutoProps {
  isSidebarOpen: boolean;
  headerHeight: string; 
}

const Boruto: React.FC<BorutoProps> = ({ isSidebarOpen, headerHeight }) => {
  return (
    <main 
      className="flex-1 bg-gradient-to-b from-gray-100 to-gray-300 transition-all duration-300 overflow-hidden"
      style={{
        width: isSidebarOpen ? `calc(100vw - 275px)` : `calc(100vw - 55px)`,
        height: `calc(100vh - ${headerHeight})`,
      }}
    >
      <Box className="p-4 md:p-8">
        <Typography variant="h3" gutterBottom className="text-[#FF6347] font-extrabold text-center">
          Boruto: Naruto Next Generations - A New Dawn
        </Typography>
        <Paper elevation={3} className="p-4 md:p-8 mb-6 rounded-lg shadow-lg bg-white">
          <Typography variant="body1" paragraph>
            <strong>Boruto: Naruto Next Generations</strong> introduces us to a new era in the Hidden Leaf Village, following <strong>Boruto Uzumaki</strong>, the son of Naruto. He navigates his own path while dealing with the shadows of his father's legacy in a rapidly evolving world of ninja.
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            New Challenges
          </Typography>
          <Typography variant="body1" paragraph>
            Boruto's journey is filled with fresh dilemmas:
            <ul className="list-disc pl-4 mt-2">
              <li>The challenge of forging his identity apart from Naruto's shadow.</li>
              <li>The dynamics of teamwork and camaraderie with his peers.</li>
            </ul>
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Themes of Legacy
          </Typography>
          <Typography variant="body1" paragraph>
            Explore vital themes that resonate throughout the series:
            <ul className="list-disc pl-4 mt-2">
              <li>The challenge of forging one’s own path</li>
              <li>The balance between tradition and modernity</li>
              <li>The evolving definition of what it means to be a ninja</li>
            </ul>
          </Typography>
        </Paper>
      </Box>
    </main>
  );
};

export default Boruto;
