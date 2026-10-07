(() => {
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const items = [...document.querySelectorAll('.material-item')];
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');
  let activeFilter = 'todos';

  function normalize(value) {
    return (value || '')
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function applyFilters() {
    const query = normalize(searchInput.value.trim());
    let visible = 0;
    items.forEach(item => {
      const categoryMatch = activeFilter === 'todos' || item.dataset.category === activeFilter;
      const haystack = normalize(`${item.dataset.search} ${item.innerText}`);
      const searchMatch = !query || haystack.includes(query);
      const show = categoryMatch && searchMatch;
      item.classList.toggle('d-none', !show);
      if (show) visible++;
    });
    emptyState.classList.toggle('d-none', visible !== 0);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', applyFilters);

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      const instance = bootstrap.Collapse.getInstance(menu);
      if (instance) instance.hide();
    });
  });
})();
