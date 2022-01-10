import React from 'react';

import './Footer.css';

// TWO valid ways of declaring functional components:
// const Footer = () =>
//	{
function Footer() {
	return (
		<footer className='footer'>
			<div>
				ReactJS & Redux
			</div>
			<div>
				On RaspberryPi
			</div>
			<div>
				Ⓒ 2021, 2022
				<a href='mailto:ron@ronaldbarnes.ca?subject=ReactJS'>{' '}
				Ronald Barnes</a>
			</div>
		</footer>
		);
	}

export default Footer;

