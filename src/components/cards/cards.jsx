import React from "react";
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import styles from './cards.module.css';
import CountUp from 'react-countup';
import names from 'classnames';

export default function Cards({data: {confirmed, recovered, deaths, lastUpdate}}) {
  if (!confirmed) {
    return "Loading...";
  }
  const items = [
    [confirmed, 'Infected', styles.infected, 'Total number of cases of COVID-19'], 
    [recovered, 'Recovered', styles.recovered, 'Number of recovered cases from COVID-19'], 
    [deaths, 'Deaths', styles.deaths, 'Number of deaths due to COVID-19']
  ];
  return (
    <div className={styles.container}>
        <Grid container spacing={3} justifyContent="center">
          {items.map((key, i) => 
            <Grid item component={Card} key={i} xs={12} md={3} className={names(styles.card, key[2])}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>{key[1]}</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={key[0].value} duration={2.5} separator=','/>
                </Typography>
                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                <Typography variant="body2">{key[3]}</Typography>
              </CardContent>
            </Grid>          
          )}
        </Grid>
    </div>
  )
}
