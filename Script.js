import { Data } from './Data.js'
      
// FOR HEADLINE 
function headlineTempplet(data){
        
const title = document.querySelector(".h-title");
  title.textContent = data.title;

  const description = document.querySelector(".h-description");
  description.textContent = data.description;

  const date = document.querySelector(".h-date");
  date.textContent = data.publishedAt;

     const img = document.querySelector(".h-image");
  img.src = data.urlToImage;   
  img.alt = data.title; 
      }

function headlineNews() {
  const firstItem = Data[0]; // only first element
  headlineTempplet(firstItem); // just fill content
}
    headlineNews();

// FOR CARDS 


function card(data){
        const wrapper = document.createElement("div");

      const title = document.createElement("div");
      title.textContent = data.title;
         title.classList.add("card-title");

          title.addEventListener("click", () => {
  window.location.href = data.url; // redirects in same tab
});


      const date = document.createElement("div");
      date.textContent = data.publishedAt;
      date.classList.add("card-date");

  
    const img = document.createElement("img");
    img.src = data.urlToImage;
    img.alt = data.title || "News Image";
    img.classList.add("card-img"); // CSS class
    wrapper.appendChild(img);
  
      wrapper.appendChild(title);
      wrapper.appendChild(date);
      return wrapper;

    }
         function cards(){
            const container=document.getElementById("card");
            Data.forEach((item)=>{
                container.appendChild(card(item));
            });
         }
         cards();

// FOR SIDE NEWS 

   
    function SideTemplet(data) {
      const wrapper = document.createElement("div");

      const title = document.createElement("h4");
      title.textContent = data.title;
         title.classList.add("side-title");
        title.addEventListener("click", () => {
        window.location.href = data.url; // redirects in same tab
        });


      const date = document.createElement("div");
      date.textContent = data.publishedAt;

      wrapper.appendChild(title);
      wrapper.appendChild(date);
      return wrapper;
    }

    function SideNews() {
      const container = document.getElementById("side-news");
      Data.forEach((item) => {
        container.appendChild(SideTemplet(item));
      });
    }

    SideNews();
