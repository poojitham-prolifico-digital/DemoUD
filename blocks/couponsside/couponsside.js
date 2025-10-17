export default function decorate(block) {
  try {

    const printLabel = block.querySelector('div:first-child > div:nth-child(2) p:last-child');

    if (!printLabel) {
      console.error('PRINT label not found in coupon block.');
      return;
    }

    printLabel.addEventListener('click', () => {
      console.log('PRINT button clicked. Opening print dialog...');
      window.print();
    });

    printLabel.style.cursor = 'pointer';
  } catch (error) {
    console.error('Error attaching print functionality:', error);
  }
}
