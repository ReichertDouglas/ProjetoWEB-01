import Swal from "sweetalert2";

export default function Error() {
  Swal.fire({
    title: "Erro ao cadastrar",
    text: "Currículo não cadastrado",
    icon: "error"
  });
}