import { motion } from 'framer-motion';
import React from 'react';

function Spinner() {
	return (
		<div className="w-16 h-16 border-8 border-l-barber-red border-transparent rounded-full animate-spin"></div>
	);
}

export default Spinner;
