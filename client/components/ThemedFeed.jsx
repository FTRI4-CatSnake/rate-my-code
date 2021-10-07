import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FeedCodeBlock from './FeedCodeBlock.jsx';


const theme = createTheme();
const drawerWidth = 200;


export default function ThemedFeed(props) {

  const [codeBlocks, setCodeBlocks] = React.useState([]);

  // update state that we fetch
  function getFeed() {
    fetch(`/api/gettopic/${props.topic}`) //removed /topic
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    getFeed();
  },[props.topic]);

  // create codeblock components and save them in an array called 'codeBlockEl'
  const codeBlockEl = codeBlocks.map(post => {
    return (
      <Grid item key={post} xs={12} sm={6} md={4}>
        <FeedCodeBlock sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
          key={post._id} 
          post={post}
          clickHandler = {props.clickHandler}
        />
      </Grid>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/*Hero*/}
        <Box
          sx={{
            bgcolor: 'Background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography 
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Welcome to Rate-My-Code
            </Typography>
            <Typography variant='h5' align='center' color='text.secondary' paragraph>
              Rate-My-Code is a supportive online community where you can post blocks of code that are not acting as you expect them to.
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction='row'
              align='center'
              spacing={4}
            >
              <Button variant='contained' align='center'>Add A Post</Button>
              <Button variant="outlined">Secondary action</Button>

            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {codeBlockEl}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}