import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const showCalendar = async () => {
  const calendarContainer = document.getElementById('reservas-calendar');
  const reservasSnapshot = await getDocs(collection(db, "reservas"));
  const reservas = reservasSnapshot.docs.map(doc => doc.data());

  let calendarHTML = '<div class="calendar">';
  for (let i = 1; i <= 30; i++) {
    const diaReservado = reservas.some(reserva => reserva.dia === i);
    const diaClass = diaReservado ? 'reservado' : 'disponivel';
    calendarHTML += <div class="dia ${diaClass}" data-dia="${i}">${i}</div>;
  }
  calendarHTML += '</div>';
  calendarContainer.innerHTML = calendarHTML;

  const dias = document.querySelectorAll('.dia');
  dias.forEach(dia => {
    dia.addEventListener('click', () => reservarDia(dia));
  });
};

const reservarDia = async (diaElemento) => {
  const dia = diaElemento.getAttribute('data-dia');
  const user = 'morador-exemplo@dominio.com'; // Usuário para a reserva

  try {
    await addDoc(collection(db, "reservas"), {
      dia: dia,
      user: user,
      status: 'reservado'
    });
    alert(Dia ${dia} reservado com sucesso!);
    diaElemento.classList.add('reservado');
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer reserva.");
  }
};

showCalendar();