// Accessibility: focus input on load
window.onload = () => {
  document.getElementById('search-input').focus();
};

// Interactivity: handle product search
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsSection = document.getElementById('results-section');

searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchProducts();
});

function searchProducts() {
  const query = searchInput.value.trim();
  if (!query) {
    resultsSection.innerHTML = '<p style="color: var(--danger)">Please enter a product name.</p>';
    return;
  }
  resultsSection.innerHTML = '<p>Searching for best prices...</p>';
  // Simulate async fetch (replace with real API call)
  setTimeout(() => {
    resultsSection.innerHTML = `
      <h3>Results for "${query}"</h3>
      <ul>
        <li><b>Wireless Mouse</b> - $23.49 at eBay, $25.99 at Amazon</li>
        <li><b>Bluetooth Headphones</b> - $54.99 at Walmart, $59.99 at Amazon</li>
        <li><b>USB-C Charger</b> - $18.99 at eBay, $19.99 at Walmart</li>
      </ul>
      <p style="color: var(--success)">All items are authentic. No fake items!</p>
    `;
  }, 900);
}

// Product data for modal (add descriptions for each product)
const productDetails = {
  'Wireless Mouse': {
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'eBay', price: '$23.49', link: 'https://www.ebay.com/' },
      { store: 'Amazon', price: '$25.99', link: 'https://www.amazon.com/' }
    ],
    desc: 'A smooth, responsive wireless mouse for everyday use. Ergonomic design and long battery life.'
  },
  'Bluetooth Headphones': {
    img: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'Walmart', price: '$54.99', link: 'https://www.walmart.com/' },
      { store: 'Amazon', price: '$59.99', link: 'https://www.amazon.com/' }
    ],
    desc: 'High-fidelity Bluetooth headphones with noise cancellation and 20-hour battery.'
  },
  'USB-C Charger': {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'eBay', price: '$18.99', link: 'https://www.ebay.com/' },
      { store: 'Walmart', price: '$19.99', link: 'https://www.walmart.com/' }
    ],
    desc: 'Fast-charging USB-C charger compatible with most modern devices.'
  },
  'Yoga Mat': {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'Target', price: '$29.99', link: 'https://www.target.com/' }
    ],
    desc: 'Non-slip yoga mat for all levels. Lightweight and easy to carry.'
  },
  'Water Bottle': {
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'Amazon', price: '$12.99', link: 'https://www.amazon.com/' }
    ],
    desc: 'Insulated stainless steel water bottle. Keeps drinks cold for 24 hours.'
  },
  'Smart Watch': {
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'Best Buy', price: '$199.99', link: 'https://www.bestbuy.com/' }
    ],
    desc: 'Track your fitness, notifications, and more with this stylish smart watch.'
  },
  'Organic Granola': {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: 'Whole Foods', price: '$7.99', link: 'https://www.wholefoodsmarket.com/' }
    ],
    desc: 'Healthy, organic granola made with whole grains and natural sweeteners.'
  },
  'Green Tea': {
    img: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    prices: [
      { store: "Trader Joe's", price: '$4.99', link: 'https://www.traderjoes.com/' }
    ],
    desc: 'Refreshing and antioxidant-rich green tea leaves for a healthy lifestyle.'
  }
};

// Modal logic
const modal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalBuy = document.getElementById('modal-buy');

// Open modal on product card click
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const details = productDetails[title];
    if (details) {
      modalImg.src = details.img;
      modalTitle.textContent = title;
      // Show all best prices as a list with links
      modalPrice.innerHTML = details.prices.map(p => `<a href="${p.link}" target="_blank" rel="noopener" class="store-link">${p.price} at ${p.store}</a>`).join('<br>');
      modalDesc.textContent = details.desc;
      // Set buy button to first price link
      if (details.prices[0]) {
        modalBuy.onclick = () => window.open(details.prices[0].link, '_blank');
        modalBuy.style.display = '';
      } else {
        modalBuy.style.display = 'none';
      }
      modal.style.display = 'flex';
      modal.focus();
    }
  });
});

// Close modal logic
function closeModal() {
  modal.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal);
closeModalBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') closeModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Feedback modal for footer
const feedbackLink = document.getElementById('feedback-link');
if (feedbackLink) {
  feedbackLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thank you for your feedback! (This can be replaced with a real feedback form.)');
  });
}

// Collapsible Flowise chatbox logic with animation
const flowiseBtn = document.getElementById('flowise-toggle-btn');
const flowiseBox = document.getElementById('flowise-chatbox');
let flowiseOpen = false;

function toggleFlowiseChat() {
  flowiseOpen = !flowiseOpen;
  if (flowiseOpen) {
    flowiseBox.style.display = 'block';
    setTimeout(() => flowiseBox.classList.add('open'), 10);
    flowiseBtn.setAttribute('aria-label', 'Close chat assistant');
    flowiseBtn.title = 'Close chat assistant';
    flowiseBtn.textContent = '✖';
  } else {
    flowiseBox.classList.remove('open');
    flowiseBtn.setAttribute('aria-label', 'Open chat assistant');
    flowiseBtn.title = 'Chat with Sh.Ai';
    flowiseBtn.textContent = '💬';
    setTimeout(() => { flowiseBox.style.display = 'none'; }, 350);
  }
}
if (flowiseBtn && flowiseBox) {
  flowiseBtn.addEventListener('click', toggleFlowiseChat);
}
