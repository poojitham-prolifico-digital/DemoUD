export default function decorate(block) {
  const searchWrapper = block.querySelector('.icon-search')?.parentElement;

  if (searchWrapper) {
    // Wrap icon in a container
    const wrapper = document.createElement('div');
    wrapper.className = 'icon-search-wrapper';

    // Move icon inside wrapper
    wrapper.appendChild(searchWrapper.querySelector('.icon-search'));

    // Create input
    const input = document.createElement('input');
    input.className = 'search-input';
    input.type = 'text';
    input.placeholder = 'Type to Search';

    wrapper.appendChild(input);

    searchWrapper.innerHTML = '';
    searchWrapper.appendChild(wrapper);

    wrapper.querySelector('.icon-search').addEventListener('click', () => {
      wrapper.classList.toggle('active');
    });
  }
}
