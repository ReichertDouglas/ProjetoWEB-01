import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { NavigateFunction, useNavigate } from 'react-router-dom';

const NAVIGATE_URL = '/visualizar-curriculos';

export const successCreate = (navigate: NavigateFunction) => {
  confetti({
    particleCount: 600,
    spread: 200,
    origin: { y: 0.6 },
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#000000"],
  });

  Swal.fire({
    title: "Currículo adicionado com sucesso!",
    text: "Seu currículo foi cadastrado com sucesso!",
    icon: "success",
    confirmButtonText: "Vamos lá!",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate(NAVIGATE_URL);
    }
  });
}

export const successUpdate = () => {
  const navigate = useNavigate();
  Swal.fire({
    title: "Currículo atualizado com sucesso!",
    text: "Seu currículo foi atualizado com sucesso!",
    icon: "success",
    confirmButtonText: "Vamos lá!",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate(NAVIGATE_URL);
    }
  });
}