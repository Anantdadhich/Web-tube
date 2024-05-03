import { Pageheader } from "./layouts/pageheader";
import { Categorypills } from "./compo/category";
import { categories } from "./data/home";
import { VediogridItem } from "./compo/vediogrid";
import { videos } from "./data/vedios";
import { useState } from "react";
import { Sidebar } from "./layouts/sidebar";
import { SidebarContextProvider } from "./context/sidebarcon";


function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Corrected typo

  return (  
     <SidebarContextProvider>
    <div className="max-h-screen flex flex-col">
      <Pageheader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar></Sidebar>
        <div className="overflow-x-hidden pb-4 px-8">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <Categorypills
              categories={categories}
              selectedcategories={selectedCategory}
              onSelect={(category) => setSelectedCategory(category)} // Pass function reference
            />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VediogridItem key={video.id} {...video} />
         
            ))}
          </div>
        </div>
      </div>
    </div>
</SidebarContextProvider>
  );
}

export default App;

