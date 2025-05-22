document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById('filter-toggle');
    const filtersBox = document.getElementById('filters');
    const resetBtn = document.getElementById('reset-filters');

    const priceSelect = document.getElementById('price-filter');
    const colorSelect = document.getElementById('color-filter');
    const categorySelect = document.getElementById('category-filter');

    const products = document.querySelectorAll('.product');

    // Affiche/masque les filtres
    filterToggle.addEventListener('click', () => {
      filtersBox.style.display = filtersBox.style.display === 'block' ? 'none' : 'block';
    });

    // Réinitialisation des filtres
    resetBtn.addEventListener('click', () => {
      priceSelect.value = "";
      colorSelect.value = "";
      categorySelect.value = "";
      filterProducts();
    });

    // Applique les filtres dès qu'on change une valeur
    [priceSelect, colorSelect, categorySelect].forEach(select => {
      select.addEventListener('change', filterProducts);
    });

    function filterProducts() {
      const priceFilter = priceSelect.value;
      const colorFilter = colorSelect.value;
      const categoryFilter = categorySelect.value;

      products.forEach(product => {
        const price = parseFloat(product.dataset.price);
        const color = product.dataset.color;
        const category = product.dataset.category;

        let priceMatch = false;
        if (priceFilter === "low") priceMatch = price < 20;
        else if (priceFilter === "mid") priceMatch = price >= 20 && price <= 50;
        else if (priceFilter === "high") priceMatch = price > 50;
        else priceMatch = true;

        const colorMatch = colorFilter === "" || color === colorFilter;
        const categories = category.split(" ");
        const categoryMatch = categoryFilter === "" || categories.includes(categoryFilter);


        if (priceMatch && colorMatch && categoryMatch) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }
  });