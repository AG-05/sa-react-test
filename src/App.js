// @flow
import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Board from './components/Board/index';
import Population from './models/population/index';
import randomSource from './models/population/sources/index';

const useStyles = makeStyles({
  root: {
    marginTop: '65px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  button: {
    marginTop: '30px'
  },
});


function App() {
  const classes = useStyles();
  const population = new Population(50, 50, randomSource);

  const [timerId, setTimerId] = useState();

  const tick = () => {
    if (timerId) {
      clearTimeout(timerId);
    }
    population.tick();
    setTimerId(setTimeout(() => tick(), 1000));
  }

  const stop = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    };
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Seeking Alpha React Test
        </Typography>
        <div className={classes.content}>
          <Board items={population.currentPoppulation} width={population.width} height={population.height} />

          <Button
            onClick={timerId ? stop : tick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {timerId ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default App;
