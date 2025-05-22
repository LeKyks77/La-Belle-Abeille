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

    generateLocalTicket(order); // ✅ Créer le fichier ticket
    sendTicketEmail(order);     // ✅ Envoyer l’email

    sessionStorage.setItem("lastOrder", JSON.stringify(order));
    sessionStorage.removeItem("cart");
    window.location.href = "confirmation.html";
  });
});

function generateLocalTicket(order) {
  const ticketText = `
Commande n° ${order.numero}
----------------------------
Nom       : ${order.nom}
Prénom    : ${order.prenom}
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
}

function sendTicketEmail(order) {
  const params = {
    order_number: order.numero,
    order_date: order.date,
    nom: order.nom,
    prenom: order.prenom,
    tel: order.tel,
    email: order.email,
    total: order.total,
    panier: order.panier // ← tableau d’objets { product, price }
  };

  console.log("📤 Données envoyées à EmailJS :", params);

  emailjs.send("service_fu0xtjq", "template_pxshcbg", params)
    .then(() => {
      console.log("📧 Email envoyé avec succès !");
    })
    .catch((error) => {
      console.error("❌ Erreur lors de l'envoi du mail :", error);
    });
}
