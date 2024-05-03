import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useEffect, useRef, useState } from "react";

type Categorieprops={
   categories:string[]
    selectedcategories:string
    onSelect:(category:string)=>void 
    
}
const Translate_amount=200  //it initalise the 200px translate the horizontally 

export function Categorypills({categories,selectedcategories,onSelect}:Categorieprops){
   const [translate,settranslate]=useState(0)  //horizontally trasnlation value in pixel set to 0
   const[leftvisible,setleftvisible]=useState(false)
   const [rightvisible,setrightvisible]=useState(false)
   const containeref=useRef<HTMLDivElement>(null)

  
  // this useffect hook runs whenever the categories and translates changes
   useEffect(()=>{
      if(containeref.current==null) return

      const observer=new ResizeObserver(entries=>{
         const container=entries[0]?.target  //it retrives the conatianer from first entry 
         if(container ==null) return
      setleftvisible(translate>0)
         setrightvisible(translate + container.clientWidth <container.scrollWidth)

      })

      observer.observe(containeref.current)
       
      return ()=>{
         observer.disconnect()
      }

   },[categories,translate])

   
   return <div ref={containeref}
    className="overflow-x-hidden relative">
       <div 
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content] "
        style={{transform:`translateX(-${translate}px)`}}>
       {categories.map(category=>(
         <Button key={category}
         onClick={()=>{
            onSelect(category)
         }}
         variant={selectedcategories === category? "dark":"defualt"} className="py-1 px-3 rounded-l whitespace-nowrap">
            {category}
        </Button>
       )
           
       )}
    
       </div>
      {leftvisible && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 by-gradient-to-r from-white from-50% to-transparent w-24 h-full ">
         <Button variant="ghost" size="icon" className="h-full aspect-square w-full p-1.5"
         onClick={()=>{
            settranslate(translate=>{
               const newtrasnlate=translate-Translate_amount
               if(newtrasnlate <=0 ) return 0
               return newtrasnlate
            })
         }}>
            <ChevronLeft></ChevronLeft>
         </Button>
       </div>
      )}
       {rightvisible && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 by-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end ">
         <Button variant="ghost" size="icon" className="h-full aspect-square w-full p-1.5"
         onClick={()=>{
           settranslate(translate=>{
             if(containeref.current==null) {
               return translate
             }
            const newtrasnlate=translate+Translate_amount
            const edge=containeref.current.scrollWidth
            const width=containeref.current.clientWidth
               if(newtrasnlate +width >=edge ){
                  return edge-width 
               } 
               return newtrasnlate
           }) 
         }}>
            <ChevronRight></ChevronRight>
         </Button>
       </div>
      )}
    </div>
}