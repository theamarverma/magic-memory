import React from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div className="card">
			<div className={flipped ? 'flipped ' : ''}>
				<img
					className="front"
					alt="card front"
					onClick={handleClick}
					src={card.src} //src comes from cardImages array of object
				/>
				<img
					className="back"
					alt="card back"
					onClick={handleClick}
					src={'/img/cover.png'}
				/>
			</div>
		</div> //I want to map through our cards , state the array of cards
	);
};

export default SingleCard;
