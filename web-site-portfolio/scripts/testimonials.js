async function loadComponents() {
  const includes = document.querySelectorAll("[data-include]");

  for (const element of includes) {
    const file = element.getAttribute("data-include");

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Erro ao carregar o componente: ${file}`);
      }

      const html = await response.text();
      element.innerHTML = html;

      console.log(`Componente carregado: ${file}`);
    } catch (error) {
      console.error(error);

      element.innerHTML = `
        <p class="p-4 text-center text-red-400">
          Erro ao carregar componente.
        </p>
      `;
    }
  }
}