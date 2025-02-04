import {useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();



const Icon = styled(CameraIcon)(({ theme }) => ({
  marginRight: theme.spacing(2)
}));

const HeroContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(8, 0, 6)
}));

const HeroButtons = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const CardGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8)
}));

const CardStyled = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

const CardMediaStyled = styled(CardMedia)({
  paddingTop: "56.25%" // 16:9
});

const CardContentStyled = styled(CardContent)({
  flexGrow: 1
});

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6)
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {

  useEffect(()=>{

    const token = localStorage.getItem('token')

    fetch('http://localhost:3003/authen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
    })
    .then(response => response.json())
    
    .then(data => { 
      if (data.status === 'ok'){
        // alert('authen success')
      }else{  
        alert('authen failed')
        localStorage.removeItem('token');
        window.location = '/login'
      }
    })
    .catch(error => {console.error('Error: ',error)});
  }, [])

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/login'
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Icon />
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
          <div className="navbar" >          
            <Button variant="outlined" color="inherit" size="medium" onClick={handleLogout}>
              Logout
              </Button>
          </div>
        </Toolbar>
        
      </AppBar>
      <main>
        {/* Hero unit */}
        <HeroContent>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <HeroButtons>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </HeroButtons>
          </Container>
        </HeroContent>
        <CardGrid maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <CardStyled>
                  <CardMediaStyled
                    image="https://random.imagecdn.app/500/150"
                    title="Image title"
                  />
                  <CardContentStyled>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContentStyled>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        </CardGrid>
      </main>
      {/* Footer */}
      <Footer>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Footer>
      {/* End footer */}
    </ThemeProvider>
  );
}