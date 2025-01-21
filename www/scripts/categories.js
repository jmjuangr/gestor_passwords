document.addEventListener("DOMContentLoaded", () => {
  const categoryList = document.querySelector("#category-list");
  const sitesTable = document.querySelector("#sites-table");
  const sitesTableBody = sitesTable.querySelector("tbody");

  // Mostrar categories
  const drawData = (data) => {
    categoryList.innerHTML = "";
    data.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category.name;

      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("button-div");

      // Botón para eliminar categoría
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.id = `delete-button-${category.name}`;
      deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/categories/${category.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting category");
            }
            return fetch("http://localhost:3000/categories");
          })
          .then((res) => res.json())
          .then((data) => drawData(data)) 
          .catch((error) => console.error("Error deleting category:", error));
      });

      // Botón para seleccionar categoría
      const selectButton = document.createElement("button");
      selectButton.textContent = "Select";
      selectButton.id = `select-button-${category.name}`;
      selectButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/categories/${category.id}`)
          .then((res) => res.json())
          .then((data) => drawSites(data.sites)) 
          .catch((error) => console.error("Error loading category:", error));
      });

      buttonDiv.appendChild(deleteButton);
      buttonDiv.appendChild(selectButton);

      li.appendChild(buttonDiv);
      categoryList.appendChild(li);
    });
  };

  // Mostrar sitios de una categoría
  const drawSites = (sites) => {
    sitesTableBody.innerHTML = ""; 
    sites.forEach((site) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${site.name}</td>
        <td>${site.url}</td>
        <td>${site.user}</td>
        <td>${site.password}</td>
        <td>${site.createdAt}</td>
        <td>
          <button class="delete-site" data-site-id="${site.id}">Delete</button>
        </td>
      `;

      // Botón de eliminar sitio
      const deleteSiteButton = row.querySelector(".delete-site");
      deleteSiteButton.addEventListener("click", () => {
        fetch(`http://localhost:3000/sites/${site.id}`, { method: "DELETE" })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting site");
            }
            return fetch(`http://localhost:3000/categories/${site.categoryId}`);
          })
          .then((res) => res.json())
          .then((data) => drawSites(data.sites)) 
          .catch((error) => console.error("Error deleting site:", error));
      });

      sitesTableBody.appendChild(row);
    });

    sitesTable.classList.remove("hide-sites-table"); 
  };

  // Cargar categorías al iniciar
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => drawData(data)) 
    .catch((error) => console.error("Error loading categories:", error));
});


  // Lógica añadir categoría
  document.addEventListener("DOMContentLoaded", () => {
    const addNewCategoryBtn = document.querySelector("#add-category");
    const modalBackground = document.querySelector("#modal-background");
    const closeCategoryWindow = document.querySelector("#close-category-window");
    const categoryForm = document.querySelector("#category-window-form");
  
    
    addNewCategoryBtn.addEventListener("click", () => {
      modalBackground.classList.remove("hide-modal");
    });
  
    
    closeCategoryWindow.addEventListener("click", () => {
      modalBackground.classList.add("hide-modal");
    });
  
   
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newCategoryName = document.querySelector("#name-new-category").value;
  
      if (newCategoryName) {
        fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategoryName }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error creating category");
            }
            alert(`Category added: ${newCategoryName}`);
            modalBackground.classList.add("hide-modal"); 
            document.querySelector("#name-new-category").value = ""; 
            return fetch("http://localhost:3000/categories");
          })
          .then((res) => res.json())
          .then((data) => drawData(data)) 
          .catch((error) => console.error("Error trying to add category:", error));
      } else {
        alert("Please type a valid name");
      }
    });
  });
  




