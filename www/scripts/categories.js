document.addEventListener("DOMContentLoaded", () => {
  const categoryList = document.querySelector("#category-list");

  const drawData = (data) => {
    categoryList.innerHTML = "";
    data.forEach((category) => {
      const li = document.createElement("li");
      li.textContent = category.name;
      //Lógica añadir botón de eliminar y eliminar categoría
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

      const selectButton = document.createElement("button");
      selectButton.textContent = "Select";
      selectButton.id = `select-button-${category.name}`;

      li.appendChild(deleteButton);
      li.appendChild(selectButton);
      categoryList.appendChild(li);
    });
  };

  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => drawData(data))
    .catch((error) => console.error(error));

  // Lógica añadir categoría
  const addNewCategoryBtn = document.querySelector("#add-category");
  const categoryWindow = document.querySelector("#category-window");
  const closeCategoryWindow = document.querySelector("#close-category-window");
  const categoryForm = document.querySelector("#category-window-form");

  addNewCategoryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    categoryWindow.classList.remove("hide-category-window");
  });

  closeCategoryWindow.addEventListener("click", (e) => {
    e.preventDefault();
    categoryWindow.classList.add("hide-category-window");
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
          categoryWindow.classList.add("hide-category-window");
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
