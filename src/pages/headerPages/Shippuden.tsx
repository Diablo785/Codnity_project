import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ShippudenProps {
  isSidebarOpen: boolean;
  headerHeight: string; 
}

const Shippuden: React.FC<ShippudenProps> = ({ isSidebarOpen, headerHeight }) => {
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
          Naruto: Shippuden - The Saga Continues
        </Typography>
        <Paper elevation={3} className="p-4 md:p-8 mb-6 rounded-lg shadow-lg bg-white">
          <Typography variant="body1" paragraph>
            <strong>Naruto: Shippuden</strong> takes us deeper into the narrative, following a matured Naruto as he returns to the Hidden Leaf Village after rigorous training. Now, he faces darker challenges, especially from the enigmatic <em>Akatsuki</em> organization, testing his resolve and strength.
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Major Themes
          </Typography>
          <Typography variant="body1" paragraph>
            This series delves into heavier themes:
            <ul className="list-disc pl-4 mt-2">
              <li>Loss and sacrifice in the face of adversity</li>
              <li>The complexity of revenge and redemption</li>
              <li>Building lasting bonds through trials</li>
            </ul>
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Character Development
          </Typography>
          <Typography variant="body1" paragraph>
            Watch as characters evolve and relationships are tested, particularly:
            <ul className="list-disc pl-4 mt-2">
              <li><strong>Sasuke Uchiha</strong> – His dark path leads to intense confrontations.</li>
              <li><strong>Naruto Uzumaki</strong> – A journey of self-discovery and acceptance.</li>
            </ul>
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Key Battles
          </Typography>
          <Typography variant="body1" paragraph>
            Experience thrilling battles that define the series:
            <ul className="list-disc pl-4 mt-2">
              <li><strong>The Akatsuki Confrontations</strong> – A clash of ideals and destinies.</li>
              <li><strong>The Fourth Great Ninja War</strong> – A monumental struggle for peace.</li>
            </ul>
          </Typography>
        </Paper>
      </Box>
    </main>
  );
};

export default Shippuden;
