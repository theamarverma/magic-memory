import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

//create an array of Images-------------------------
const cardImages = [
	{ src: '/img/helmet-1.png', matched: false },
	{ src: '/img/potion-1.png', matched: false },
	{ src: '/img/ring-1.png', matched: false },
	{ src: '/img/scroll-1.png', matched: false },
	{ src: '/img/shield-1.png', matched: false },
	{ src: '/img/sword-1.png', matched: false },
];

const App = () => {
	const [cards, setCards] = useState([]); //1
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	//shuffle cards
	const shuffleCards = () => {
		const shuffleCards = [...cardImages, ...cardImages] //double the array of img using spread operator
			.sort(() => Math.random() - 0.5) //sort these card by random if it's not match shuffled the card
			.map((card) => ({ ...card, id: Math.random() })); //create 12cards in each object{} with unique id between 0-1 [{card1, Id: 0.554},{card2, Id: 0.56}]... so on
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffleCards); //pass function in Cards state for shuffle cards and change cards
		setTurns(0); //every time it's gonna to reset to zero after start shuffle
	};
	// console.log(cards, turns);

	//handle a choice

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	//compare two selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					//setCards is an array that's why we're mapping it to a new object
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true }; //return a new object with match value with true
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				console.log('thats not a match');
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	console.log(cards);
	//reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	//start a game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	return (
		<div className="App">
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>
			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						handleChoice={handleChoice}
						card={card} //for pass as props in child component
						flipped={card === choiceOne || card === choiceTwo || card.matched} //true or false
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
};

export default App;
