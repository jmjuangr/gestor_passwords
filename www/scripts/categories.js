document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("category-list");
  
  
    const drawData = (data) => {
      data.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.name;

        const button = document.createElement("button");
        button.textContent = "Delete";
        li.appendChild(button);
        categoryList.appendChild(li);
      });
    };

  
  
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => drawData(data))
      .catch((error) => console.error("Error al cargar categorías:", error));

  
  

    });

   

    //Lógica añadir categoría
    const addNewCategoryBtn = document.getElementById ("add-category");
    const categoryWindow= document.getElementById ("category-window");
    const closeCategoryWindow = document.getElementById ("close-category-window")
    const categoryForm = document.getElementById ("category-window-form")
    
    
    addNewCategoryBtn.addEventListener("click",(e) =>{
      e.preventDefault();
      categoryWindow.classList.remove("hide-category-window")

    }
  );

    closeCategoryWindow.addEventListener("click",(e)=> {
      e.preventDefault();
      categoryWindow.classList.add("hide-category-window")
    }

  );



  categoryForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 
  

    const newCategoryName = document.getElementById("name-new-category").value;
  
    if (newCategoryName) {
      try {
      
        const response = await fetch("http://localhost:3000/categories", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategoryName }),
        });
  
      
        if (!response.ok) {
          throw new Error("Error"); 
        }
  
        const data = await response.json(); 
        alert(`Category added: ${newCategoryName}`);
  
      } catch (error) {
        console.error(`Error trying to add category: ${error}`);
       
      }
    } else {
      
      alert("Please type a valid name");
    }
  });

  
