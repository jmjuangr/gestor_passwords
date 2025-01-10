document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.querySelector("#category-list");
    const sitesForm = document.querySelector("#sites-form");
    const saveSiteButton = document.querySelector("#save-site");
    const cancelSiteButton = document.querySelector("#cancel-site");
  
    let selectedCategoryId = null; //Gaurda ID de la categoría seleccionada
  
    // Muestra categorías
    const drawData = (data) => {
      categoryList.innerHTML = "";
      data.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.name;
  
        const addSiteButton = document.createElement("button");
        addSiteButton.textContent = "Add site";
        addSiteButton.id = `add-site-button-${category.id}`;
  
        // Evento para mostrar el formulario al hacer clic en "Add site"
        addSiteButton.addEventListener("click", () => {
            selectedCategoryId = category.id; // Guardar el ID de la categoría seleccionada
          sitesForm.classList.remove("hide-form"); // Mostrar el formulario
        });
  
        li.appendChild(addSiteButton);
        categoryList.appendChild(li);
      });
    };
  
    // Evento para guardar el sitio al enviar el formulario
    saveSiteButton.addEventListener("click", (e) => {
      e.preventDefault();
  
      // Obtener los datos del formulario
      const siteData = {
        name: document.querySelector("#site-name").value,
        url: document.querySelector("#site-url").value,
        user: document.querySelector("#site-user").value,
        password: document.querySelector("#site-password").value,
        description: document.querySelector("#site-description").value,
      };
  
      // Validar que los campos no estén vacíos
      if (!siteData.name ||!siteData.url || !siteData.user || !siteData.password) {
        alert("Todos los campos obligatorios deben completarse.");
        return;
      }
  
      // Hace POST para guardar el sitio
      fetch(`http://localhost:3000/categories/${selectedCategoryId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error saving site.");
          }
          return fetch("http://localhost:3000/categories"); // Actualizar la lista de categorías
        })
        .then((res) => res.json())
        .then((data) => {
          drawData(data); // Redibujar las categorías
          sitesForm.classList.add("hide-form"); // Ocultar el formulario
          alert("Sitio guardado con éxito.");
          // Limpiar los campos del formulario
          document.querySelector("#site-name").value="";
          document.querySelector("#site-url").value = "";
          document.querySelector("#site-user").value = "";
          document.querySelector("#site-password").value = "";
          document.querySelector("#site-description").value = "";
        })
        .catch((error) => console.error("Error saving site", error));
    });
  
    // Boton cancel
    cancelSiteButton.addEventListener("click", () => {
      sitesForm.classList.add("hide-form"); // Ocultar el formulario
    });
  
    // Mostrar categories
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => drawData(data))
      .catch((error) => console.error("Error al cargar categorías:", error));
  });
  