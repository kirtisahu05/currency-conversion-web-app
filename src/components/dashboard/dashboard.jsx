import React from "react";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Rate from './Rate.js'

const BASE_URL = 'https://api.exchangeratesapi.io/latest';



const Dashboard = (props) => {

  const [exchangeRateList, setExchangeRateList] = React.useState();
  const [exchangeRateBaseDetails, setExchangeRateBaseDetails] = React.useState();

  React.useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const {base, date, rates} = data;
        let ratesArr = Object.entries(rates)
        .map(([currency, rate]) => ({ currency: currency, rate: rate }));
        setExchangeRateBaseDetails({base, date});
        setExchangeRateList(ratesArr);
        console.log(ratesArr);
      })
  }, [])

  const [state, setState] = React.useState({
    amount: '',
    source: [],
    destination: []
  });
  const [selectedExchangeRateList, setSelectedExchangeRateList] = React.useState({});

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const actionsHandler = (name, data, id) => {
    if(!name) return;
    switch((name.toLowerCase()).replace(/\s/g, '')){

      case 'handlechange':
        setState({ ...state, [id]: data.target.value });
        break;
      
      case 'handlesubmit':
        console.log(state);
        fetchConversion();
        break;

      default: break
    }
  }

  const fetchConversion = () => {
    fetch(`${BASE_URL}?base=${state.source}&symbols=${state.destination.toString()}`)
        .then(res => res.json())
        .then(data => setSelectedExchangeRateList(data.rates))
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <Container>
      <div className="header">Currency Exchange Rates</div>
      <div className="content">
          <div className="heading">
            <span >Base Currency: { exchangeRateBaseDetails?.base}</span>
            <span className="heading">Date: { exchangeRateBaseDetails?.date}</span>
          </div>
          <ul className="display-inline-flex">
            {exchangeRateList?.map(rate =>
              <Rate
                {...rate}
              />
            )}
          </ul>
        </div>
        </Container>
        <Container>
        <div className="header">Currency Converter</div>
        <div className="form">
          <TextField 
            id="outlined-username"
            label="Enter Amount"
            placeholder="Enter Amount" 
            type="number"
            value={state.amount}
            onChange={(event) => actionsHandler('handlechange', event, 'amount')}
            variant="outlined" />
          <br /><br />
          <div class="converter-fields">
            <FormControl variant="outlined">
              <InputLabel id="demo-mutiple-name-label">From Currency</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                label="From Currency"
                value={state.source}
                onChange={(event) => actionsHandler('handlechange', event, 'source')}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {exchangeRateList && exchangeRateList.map((rate) => (
                  <MenuItem key={rate.currency} value={rate.currency}>
                    {rate.currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br /><br />
            <FormControl variant="outlined">
              <InputLabel id="demo-mutiple-name-label">To Currency</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={state.destination}
                onChange={(event) => actionsHandler('handlechange', event, 'destination')}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={'chips'}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={'chip'} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {exchangeRateList && exchangeRateList.map((rate) => (
                  <MenuItem key={rate.currency} value={rate.currency}>
                    <Checkbox checked={state.destination.indexOf(rate.currency) > -1} />
                    <ListItemText primary={rate.currency} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <br /><br />
          <Button variant="contained" color="primary" className="btn" onClick={() => actionsHandler('handlesubmit')}>
            Submit
          </Button>
          <div className="converted-list">
            {selectedExchangeRateList && Object.keys(selectedExchangeRateList).map((key) => 
              <div>&#x25BA;{state.amount} {state.source} = {state.amount * selectedExchangeRateList[key]} {key}</div>
              )
            }
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
