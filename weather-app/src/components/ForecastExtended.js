import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';
import './styles.css';


/*
const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
]

const data = {
    temperature: 10,
    humidity: 10,
    weatherState: 'sun',
    wind: 'normal',
}
*/

export const api_key = "ebce93f89efaa1026d094d012c40037b";
export const url = "http://api.openweathermap.org/data/2.5/forecast";

class ForecastExtended extends Component{

    constructor(){
        super();
        this.state = { forecastdata: null }
    }

    componentDidMount(){
        this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.city !== this.props.city){
            this.setState({forecastData: null});
            this.updateCity(nextProps.city);
        }
    }

    updateCity = city => 
    {
        const url_forecast = `${url}?q=${city}&appid=${api_key}`;

        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            Weather_data => {
                console.log(Weather_data);
                const forecastData = transformForecast(Weather_data);
                console.log(forecastData);
                this.setState({ forecastData  });
            }
        )
    }

    renderForecastItemDays(forecastData) {
         return forecastData.map( forecast => (
         <ForecastItem 
         key={`${forecast.weekDay}${forecast.hour}`}
         weekDay={forecast.weekDay} 
         hour={forecast.hour} 
         data={forecast.data}>

         </ForecastItem>));
            }

    renderProgress = () => {
        return <h3>"Cargando Pronostico extendido..."</h3>;
    }        

    render(){
        const {city} = this.props;
        const { forecastData } = this.state;
        return(<div> 
            <h2 className='forecast-title'>Pronóstico Extendido para {city}</h2>
            {forecastData ? 
                this.renderForecastItemDays(forecastData) :
                this.renderProgress()}
            </div>);
    }
}

ForecastExtended.propTypes ={
    city: PropTypes.string.isRequired,
}
export default ForecastExtended;