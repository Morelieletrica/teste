import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Enviar notificação
const enviarNotificacao = async (message) => {
  const notificationsRef = collection(db, "notificacoes");
  try {
    await addDoc(notificationsRef, {
      message: message,
      data: new Date()
    });
    alert("Notificação enviada com sucesso!");
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar notificação.");
  }
};

// Exibir todas as notificações
const mostrarNotificacoes = async () => {
  const notificationsContainer = document.getElementById('notificacoes-list');
  const notificationsSnapshot = await getDocs(collection(db, "notificacoes"));
  const notifications = notificationsSnapshot.docs.map(doc => doc.data());

  notificationsContainer.innerHTML = '';
  notifications.forEach(notification => {
    notificationsContainer.innerHTML += `
      <div class="notificacao">
        <p>${notification.message}</p>
        <p>${notification.data.toDate().toLocaleString()}</p>
      </div>
    `;
  });
};

mostrarNotificacoes();