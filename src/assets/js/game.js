const grid = document.querySelector('.grid');

const actors = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card');

    if (disabledCards.length == 20) {
        alert('Game Over!');
    }
}

const checkCards = () => {
    const firstActor = firstCard.getAttribute('data-character');
    const secondActor = secondCard.getAttribute('data-character');

    if (firstActor == secondActor) {

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (actor) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(/src/assets/img/${actor}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', actor);

    return card;
}

const loadGame = () => {

    const doubleActors = [ ...actors, ...actors ];

    const shuffle = doubleActors.sort( () => Math.random() - 0.5 );

    shuffle.forEach((actor) => {
        const card = createCard(actor);
        grid.appendChild(card);

    });
}

loadGame();