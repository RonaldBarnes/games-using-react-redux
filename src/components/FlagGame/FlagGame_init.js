

import { useParams } from 'react-router-dom';
// import CountryFlagGame from './components/FlagGame/CountryFlagGame'
import CountryFlagGame from './CountryFlagGame'

const FlagGame_init = (props) => {
	console.log(`FlagGame_init props:`, props);

	let params = useParams();
	console.log(params );

/*
	// No need to set / dispatch redux globalStore properties here, don't yet
	// have enough info: just a country index but randCountries in store needs
	// all elements of countriesAll (name, flag,...):
	//
	// CountryFlagGame instead looks for props of userCountries and sets up
	// required environment from there:
	//
	let randCountries = Object.values(params);
	props.store.dispatch( {
		type: "setRandCountries",
		list: Object.values(params)
		});
*/

	return (
		<div>
			{/* JSON.stringify(params) */}
			<CountryFlagGame
				userCountries= {Object.values(params)}
				store={props.store}
				/>
		</div>
		); // end return
	} // end FlagGame_init

export default FlagGame_init;
