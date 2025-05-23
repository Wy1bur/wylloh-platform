import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Favorite as FavoriteIcon,
  NewReleases as NewReleasesIcon,
  Theaters as GenreIcon
} from '@mui/icons-material';
import RecommendationsList from './RecommendationsList';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import { RecommendationType } from '../../services/recommendation.service';
import { ContentType } from '../../services/metadata.service';

interface RecommendationPanelProps {
  title?: string;
  subtitle?: string;
  contentType?: ContentType;
  elevation?: number;
  maxItems?: number;
  showTabs?: boolean;
}

/**
 * A dashboard-style panel that displays various recommendation types in tabs
 */
const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  title = 'Recommendations',
  subtitle,
  contentType,
  elevation = 1,
  maxItems = 4,
  showTabs = true
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Recommendation options
  const options = {
    contentType,
    limit: maxItems
  };
  
  // Custom tab styling
  const tabSx = {
    minWidth: 'auto',
    fontSize: '0.875rem',
    px: 2
  };
  
  return (
    <Card elevation={elevation} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ p: 2, pb: showTabs ? 0 : 2 }}>
          <Typography variant="h6" gutterBottom={!!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {showTabs && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab icon={<FavoriteIcon fontSize="small" />} label="For You" sx={tabSx} />
              <Tab icon={<TrendingIcon fontSize="small" />} label="Trending" sx={tabSx} />
              <Tab icon={<NewReleasesIcon fontSize="small" />} label="New" sx={tabSx} />
              <Tab icon={<GenreIcon fontSize="small" />} label="Comedy" sx={tabSx} />
            </Tabs>
          </Box>
        )}
        
        <Box sx={{ p: 2 }}>
          {showTabs ? (
            <React.Fragment>
              <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
                <PersonalizedRecommendations
                  contentType={contentType}
                  title=""
                  maxItems={maxItems}
                  showReasons={false}
                  fallbackToTrending={true}
                />
              </Box>
              <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
                <RecommendationsList
                  title=""
                  type={RecommendationType.TRENDING}
                  options={options}
                  maxItems={maxItems}
                  showReason={false}
                />
              </Box>
              <Box sx={{ display: tabValue === 2 ? 'block' : 'none' }}>
                <RecommendationsList
                  title=""
                  type={RecommendationType.NEW_RELEASES}
                  options={options}
                  maxItems={maxItems}
                  showReason={false}
                />
              </Box>
              <Box sx={{ display: tabValue === 3 ? 'block' : 'none' }}>
                <RecommendationsList
                  title=""
                  type={RecommendationType.GENRE_BASED}
                  options={{
                    ...options,
                    genres: ['Comedy']
                  }}
                  maxItems={maxItems}
                  showReason={false}
                />
              </Box>
            </React.Fragment>
          ) : (
            <PersonalizedRecommendations
              contentType={contentType}
              title=""
              maxItems={maxItems}
              showReasons={false}
              fallbackToTrending={true}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecommendationPanel; 