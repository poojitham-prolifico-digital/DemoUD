export default function decorate(block) {
  const container = block.querySelector('div');
  const wrapper = block.closest('.review-wrapper');

  const cardWidth = container.children[0].offsetWidth + 24;

  // Create arrows
  const leftArrow = document.createElement('button');
  leftArrow.className = 'carousel-arrow left';
  leftArrow.innerHTML = '‹';

  const rightArrow = document.createElement('button');
  rightArrow.className = 'carousel-arrow right';
  rightArrow.innerHTML = '›';

  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);

  const scrollToStart = () => {
    container.scrollTo({ left: 0, behavior: 'instant' });
  };

  const scrollRight = () => {
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });

    setTimeout(() => {
      const firstCard = container.children[0];
      container.appendChild(firstCard);
      scrollToStart();
    }, 300); // wait for scroll to finish
  };

  const scrollLeft = () => {
    const lastCard = container.children[container.children.length - 1];
    container.insertBefore(lastCard, container.children[0]);
    scrollToStart();

    setTimeout(() => {
      container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }, 50); // slight delay to allow DOM update
  };

  leftArrow.addEventListener('click', scrollLeft);
  rightArrow.addEventListener('click', scrollRight);
}
