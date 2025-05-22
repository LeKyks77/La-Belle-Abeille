document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commande-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = form.nom.value;
    const prenom = form.prenom.value;
    const tel = form.tel.value;
    const email = form.email.value;

    const panier = JSON.parse(sessionStorage.getItem("cart")) || [];
    const total = panier.reduce((sum, p) => sum + p.price, 0);
    const numero = "CMD" + Date.now();
    const date = new Date().toLocaleString("fr-FR");

    const order = { numero, date, nom, prenom, tel, email, panier, total };

    // ✅ Enregistrer le ticket localement
    generateLocalTicket(order);

    // ✅ Stocker pour la confirmation
    sessionStorage.setItem("lastOrder", JSON.stringify(order));

    // ✅ Vider le panier
    sessionStorage.removeItem("cart");

    // ✅ Rediriger vers la page ticket
    window.location.href = "confirmation.html";
  });
});

function generateLocalTicket(order) {
  const ticketText = `
Commande n° ${order.numero}
----------------------------
Nom     : ${order.nom}
Prénom  : ${order.prenom}
Téléphone : ${order.tel}
Email     : ${order.email}
Date      : ${order.date}

Produits commandés :
${order.panier.map(p => `- ${p.product} : ${p.price} €`).join('\n')}

Total : ${order.total} €
Note : Paiement sur place, retrait uniquement.
  `;

  const blob = new Blob([ticketText], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ticket-${order.numero}.txt`;
  link.click();
  // ✅ Envoi du mail
  sendTicketEmail(order, produits);
}
function sendTicketEmail(order, produits) {
  emailjs.send("service_fu0xtjq", "template_hl54e8j", {
    order_number: order.numero,
    order_date: order.date,
    nom: order.nom,
    prenom: order.prenom,
    tel: order.tel,
    email: order.email,
    produits: produits,
    total: order.total
  })
  .then(() => {
    console.log("Email envoyé avec succès !");
  }, (error) => {
    console.error("Erreur lors de l'envoi du mail :", error);
  });
}
