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
  const DATACORRECTION_EMAIL = process.env.DATACORRECTION_EMAIL
  const IMPROVEMENTS_EMAIL = process.env.IMPROVEMENTS_EMAIL

  const improvements_hrefString = "mailto:" + IMPROVEMENTS_EMAIL
  const correction_hrefString = "mailto:" + DATACORRECTION_EMAIL + "?subject=Melding%20om%20datafeil&body=Feilen%20ble%20funnet%20her%3A%20%0D%0AOg%20omhandler%20dette%3A%20"

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <p>
          Knowit Folk. Lakkegata 53, 0178 Oslo &ensp;|&ensp; Tlf. 02486 &ensp;|
          &ensp;
          <a className={classes.link} href={improvements_hrefString}>
            Kontakt og tilbakemeldinger
          </a>
          &ensp; | &ensp;
          <a
            className={classes.link}
            href={correction_hrefString}
          >
            Meld om datafeil
          </a>
        </p>
      </footer>
    </div>
  );
}