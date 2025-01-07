document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("category-list");
  
    // Función para renderizar las categorías en el DOM
    const drawData = (data) => {
      data.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.name;
        categoryList.appendChild(li);
      });
    };
  
    // Solicitud al servidor para obtener las categorías
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => drawData(data))
      .catch((error) => console.error("Error al cargar categorías:", error));
  });
  