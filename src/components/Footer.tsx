import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    footer: {
      marginTop: '40px',
      marginBottom: '30px',
      paddingBottom: '70px',
      textAlign: 'center',
      fontSize: '12px',
      color: theme.palette.text.primary,
    },
    link: {
      color: theme.palette.text.primary,
    },
  })
);

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <p>
          Knowit Folk. Lakkegata 53, 0178 Oslo | Tlf. 02486 |
          <a className={classes.link} href="mailto:name1@mail.com">
            Kontakt
          </a>{' '}
          |
          <a
            className={classes.link}
            href="mailto:name1@mail.com?subject=Melding%20om%20datafeil&body=Feilen%20ble%20funnet%20her%3A%20%0D%0AOg%20omhandler%20dette%3A%20"
          >
            Meld om datafeil
          </a>
        </p>
      </footer>
    </div>
  );
}
