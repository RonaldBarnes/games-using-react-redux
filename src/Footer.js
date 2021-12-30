import React from 'react';

import './Footer.css';

// TWO valid ways of declaring functional components:
// const Footer = () =>
//	{
function Footer() {
	return (
		<footer className='footer'>
			<div>
				ReactJS & Express & Mongoose
			</div>
			<div>
				On RaspberryPi
			</div>
			<div>
				Ⓒ 2021 Ronald Barnes
			</div>
		</footer>
		);
	}

export default Footer;

