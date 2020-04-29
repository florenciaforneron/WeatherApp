import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Grid, Col, Row } from 'react-flexbox-grid';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';
import { setCity } from './actions';

import './App.css';
const cities = [
  'Buenos Aires, ar',
  'Washington,us',
  'Bogota, col',
  'Ciudad de Mexico, mx',
  'Madrid, es',
  'Munich,deu',
];


class App extends Component {

  constructor(){
    super();
    this.state= {city: null};
  }

  handleSelectedLocation = city => {
    this.setState({city})
    console.log(`handleSelectedLocation ${city}`);

    this.props.setCity(city);

  }
  render(){
    const {city} = this.state;
  return (
    <Grid>
      <Row>
        <Col xs={12}>
        <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
          Weather App
        </Toolbar>  
        </AppBar> 
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
        <LocationList cities={cities}
      onSelectedLocation={this.handleSelectedLocation}></LocationList>
        </Col>
        <Col xs={12} md={6}>
            <Paper elevation={4}>
            <div className="details">
              {city &&
                <ForecastExtended city={city}></ForecastExtended>
              }
            </div>
            </Paper>
        </Col>
      </Row>
      
    </Grid>    
  );
}
}

const mapDispatchToPropsActions = dispatch => ({
  setCity: value => dispatch(setCity(value))
});

const AppConnected = connect(null, mapDispatchToPropsActions)(App); 

export default AppConnected;
