import { auth } from './firebase/firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

// Cadastro de Morador
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmSenha = document.getElementById('confirm-senha').value;

  if (senha !== confirmSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Morador cadastrado com sucesso!");
    window.location.href = 'login.html'; // Redireciona para a página de login
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar morador: " + error.message);
  }
});

// Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = 'painel-morador.html'; // Redireciona para o painel do morador
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login: " + error.message);
  }
});

// Recuperação de Senha
const forgotPasswordLink = document.getElementById('forgot-password');
forgotPasswordLink.addEventListener('click', () => {
  const email = prompt("Digite seu e-mail para recuperar a senha:");
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email de recuperação enviado!");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar email de recuperação: " + error.message);
      });
  }
});