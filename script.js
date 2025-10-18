// Regex com grupos de captura para CEP: 00000-000
// ^(\d{5})-?(\d{3})$ permite com ou sem hífen e reagrupa no formato correto
const CEP_REGEX = /^(\d{5})-?(\d{3})$/;
// Regex para UF: exatamente 2 letras maiúsculas
const UF_REGEX = /^[A-Z]{2}$/;

const form = document.getElementById("form-endereco");
const cepInput = document.getElementById("cep");
const logradouroInput = document.getElementById("logradouro");
const numeroInput = document.getElementById("numero");
const ufInput = document.getElementById("uf");

// 1) CEP: máscara automática enquanto digita (00000-000)
cepInput.addEventListener("input", () => {
  // remove tudo que não é dígito
  let digits = cepInput.value.replace(/\D/g, "");
  if (digits.length > 8) digits = digits.slice(0, 8);

  if (digits.length > 5) {
    cepInput.value = `${digits.slice(0, 5)}-${digits.slice(5)}`;
  } else {
    cepInput.value = digits;
  }
});

// 2) UF: converter para maiúsculo automaticamente
ufInput.addEventListener("input", () => {
  ufInput.value = ufInput.value.toUpperCase().replace(/[^A-Z]/g, "");
  if (ufInput.value.length > 2) {
    ufInput.value = ufInput.value.slice(0, 2);
  }
});

// 3) Número: somente dígitos
numeroInput.addEventListener("input", () => {
  numeroInput.value = numeroInput.value.replace(/\D/g, "");
});

// 4) Validação no submit com preventDefault e alerts específicos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const errors = [];

  // CEP obrigatório + regex com grupos de captura
  const rawCep = cepInput.value.trim();
  const cepMatch = rawCep.match(CEP_REGEX);
  if (!rawCep) {
    errors.push("CEP é obrigatório.");
  } else if (!cepMatch) {
    errors.push("CEP inválido. Use o formato 00000-000.");
  } else {
    // Normaliza para 00000-000 usando os grupos capturados
    cepInput.value = `${cepMatch[1]}-${cepMatch[2]}`;
  }

  // Logradouro obrigatório, min 5
  const logradouro = logradouroInput.value.trim();
  if (!logradouro) {
    errors.push("Logradouro é obrigatório.");
  } else if (logradouro.length < 5) {
    errors.push("Logradouro deve conter no mínimo 5 caracteres.");
  }

  // Número obrigatório, apenas dígitos
  const numero = numeroInput.value.trim();
  if (!numero) {
    errors.push("Número é obrigatório.");
  } else if (!/^\d+$/.test(numero)) {
    errors.push("Número deve conter apenas dígitos.");
  }

  // UF obrigatório, 2 letras maiúsculas
  const uf = ufInput.value.trim();
  if (!uf) {
    errors.push("UF é obrigatório.");
  } else if (!UF_REGEX.test(uf)) {
    errors.push("UF inválido. Use exatamente 2 letras maiúsculas (ex: SP, RJ).");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  alert("Endereço cadastrado com sucesso");
  // Aqui você poderia enviar via fetch/AJAX se tivesse backend
});
