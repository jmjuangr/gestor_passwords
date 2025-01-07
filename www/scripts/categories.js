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

    
    const addNewCategoryBtn = document.getElementById ("add-category");
    const categoryWindow= document.getElementById ("category-window");
    const closeCategoryWindow = document.getElementById ("close-category-window")
    
    
    addNewCategoryBtn.addEventListener("click",(e) =>{
      e.preventDefault();
      categoryWindow.classList.remove("hide-category-window")

    }
  );

  closeCategoryWindow.addEventListener("click",(e)=> {
    e.preventDefault();
    categoryWindow.classList.add("hide-category-window")
  }

)


  
