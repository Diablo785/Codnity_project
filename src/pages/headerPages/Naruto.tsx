import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface NarutoProps {
  isSidebarOpen: boolean;
  headerHeight: string; 
}

const Naruto: React.FC<NarutoProps> = ({ isSidebarOpen, headerHeight }) => {
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
          Naruto Uzumaki: The Journey Begins
        </Typography>
        <Paper elevation={3} className="p-4 md:p-8 mb-6 rounded-lg shadow-lg bg-white">
          <Typography variant="body1" paragraph>
            Immerse yourself in the vibrant world of <strong>Naruto</strong>, where the spirited ninja Naruto Uzumaki embarks on a quest to become the <em>Hokage</em>—the ultimate leader of his village. Despite facing numerous adversities, Naruto’s indomitable spirit shines through as he learns the true meaning of friendship, resilience, and self-discovery.
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Key Characters
          </Typography>
          <Typography variant="body1" paragraph>
            Meet the unforgettable characters who shape Naruto's destiny:
            <ul className="list-disc pl-4 mt-2">
              <li><strong>Naruto Uzumaki</strong> – The tenacious dreamer with an unyielding heart.</li>
              <li><strong>Sasuke Uchiha</strong> – Naruto's enigmatic rival, torn between revenge and redemption.</li>
              <li><strong>Sakura Haruno</strong> – A fierce kunoichi and valued member of Team 7, known for her intelligence and strength.</li>
              <li><strong>Kakashi Hatake</strong> – The wise mentor, shrouded in mystery with his iconic Sharingan.</li>
              <li><strong>Hinata Hyuga</strong> – The gentle spirit whose loyalty and determination shine through adversity.</li>
            </ul>
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Major Story Arcs
          </Typography>
          <Typography variant="body1" paragraph>
            Each arc unfolds a tapestry of emotions and action:
            <ul className="list-disc pl-4 mt-2">
              <li><strong>The Land of Waves</strong> – Naruto's first taste of teamwork and courage.</li>
              <li><strong>The Chunin Exams</strong> – A fierce battle of wits and strength.</li>
              <li><strong>The Search for Tsunade</strong> – A journey of growth and discovery.</li>
            </ul>
          </Typography>
          <Typography variant="h5" gutterBottom className="text-[#CA8A04] underline decoration-solid decoration-2 underline-offset-4">
            Themes
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Naruto</strong> dives into profound themes:
            <ul className="list-disc pl-4 mt-2">
              <li>Family and belonging</li>
              <li>Overcoming loneliness</li>
              <li>The transformative power of friendship</li>
              <li>The pursuit of dreams despite overwhelming odds</li>
            </ul>
          </Typography>
        </Paper>
      </Box>
    </main>
  );
};

export default Naruto;
