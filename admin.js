import { db } from './firebase-config.js';
import { collection, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Exibir lista de moradores
const mostrarMoradores = async () => {
  const moradoresContainer = document.getElementById('moradores-list');
  const moradoresSnapshot = await getDocs(collection(db, "moradores"));
  const moradores = moradoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  moradoresContainer.innerHTML = '';
  moradores.forEach(morador => {
    moradoresContainer.innerHTML += `
      <div class="morador">
        <p>${morador.nome} - ${morador.email}</p>
        <button class="delete-btn" onclick="deleteMorador('${morador.id}')">Excluir</button>
      </div>
    `;
  });
};

// Deletar morador
const deleteMorador = async (id) => {
  try {
    await deleteDoc(doc(db, "moradores", id));
    alert("Morador excluído com sucesso!");
    mostrarMoradores(); // Atualiza a lista
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir morador.");
  }
};

mostrarMoradores();