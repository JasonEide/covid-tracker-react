import React from 'react';
import {Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';
class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }

  handleCountry = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country});
  }

  render() {
    const {data, country} = this.state;
    return (
      <div className={styles.container}>
          <Cards data={data}/>
          <CountryPicker handleCountry={this.handleCountry} />
          <Chart data={data} country={country}/>
      </div>
    );
}

}

export default App;
