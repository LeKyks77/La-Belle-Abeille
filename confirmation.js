document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(sessionStorage.getItem("lastOrder"));
  const ticket = document.getElementById("ticket");

  if (!order) {
    ticket.innerHTML = "<p>Aucune commande trouvée.</p>";
    return;
  }

  ticket.innerHTML = `
    <h2>🎫 Ticket de commande</h2>
    <p><strong>Numéro :</strong> ${order.numero}</p>
    <p><strong>Date :</strong> ${order.date}</p>
    <p><strong>Client :</strong> ${order.prenom} ${order.nom}</p>
    <p><strong>Téléphone :</strong> ${order.tel}</p>
    <p><strong>Email :</strong> ${order.email}</p>
    <p><strong>Produits :</strong></p>
    <ul>
      ${order.panier.map(p => `<li>${p.product} – ${p.price} €</li>`).join('')}
    </ul>
    <p><strong>Total :</strong> ${order.total} €</p>
    <p><em>Le paiement s’effectue sur place. Livraison non disponible.</em></p>
  `;
});
