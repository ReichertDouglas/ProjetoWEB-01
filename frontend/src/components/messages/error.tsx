import Swal from "sweetalert2";

export const errorAction = () => {
  Swal.fire({
    title: "Erro ao cadastrar",
    text: "Currículo não cadastrado",
    icon: "error"
  });
}