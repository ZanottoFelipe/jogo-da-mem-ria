import { useState } from "react";
import Board from "./Board";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const generateCards = () => {
  const values = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const cards = values.map((value) => ({
    value,
    isFlipped: false,
  }));

  const duplicatedCards = cards
    .concat([...cards])
    .map((card, index) => ({ ...card, id: index }));
  return shuffleArray(duplicatedCards);
};
function Game() {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const playerCahances = 10 ;

  const [chances, setChances] = useState(playerCahances);
  const result = cards.filter((card) => card.isFlipped).length;

  const handleCardClick = (clickeCard) => {
    if (chances === 0) return;
    if (flippedCards.length === 2) return;
    const newCards = cards.map((card) => {
      return card.id === clickeCard.id ? { ...card, isFlipped: true } : card;
    });

    setCards(newCards);
    setFlippedCards([...flippedCards, clickeCard]);
    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;
        if (firstCard.value !== clickeCard.value) {
          const resetCards = cards.map((card) => {
            return card.id === firstCard.id || card.id === clickeCard.id
              ? { ...card, isFlipped: false }
              : card;
          });

          setCards(resetCards);
          setChances((prev) => prev - 1);
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setChances(playerCahances);
    setFlippedCards([]);
    setCards(generateCards());
  };

  return (
    <div className="game">
      <Board cards={cards} onCardClick={handleCardClick} />
      {chances === 0 ? (
        <h1>Game Over!</h1>
      ) : result === cards.length ? (
        <h2> Parabéns Você ganhou!</h2>
      ) : (
        <p>Você possui {chances} tentativas restates.</p>
      )}
      <button className="btn" onClick={resetGame}>
        Reiniciar o jogo
      </button>
    </div>
  );
}

export default Game;
