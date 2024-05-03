import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import logo from "../assets/Logo.png"
import { Button } from "../compo/button"
import { useState } from "react"
import { SidebarContextConsumer } from "../context/sidebarcon"

export function Pageheader(){
   const [showfullwidht,setfullwidth]=useState(false)

   
   return <div className="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6">
           <PageHeaderFirstSection hidden={showfullwidht} />
      <form className={` flex-grow gap-4 justify-center ${showfullwidht ? "flex" :"hidden md:flex"}`}>
         <Button onClick={()=>{
          setfullwidth(false)
         }}
         type="button" size="icon" variant="ghost" className="flex-shrink-0">
          <ArrowLeft></ArrowLeft>
        
        </Button>
        <div className="flex flex-grow max-w-[600px]">
         <input type="search" placeholder="Search" className="rounded-l-full border border-secondary-border
         shadow-inner shadow-secondary py-1 px-4 w-full text-lg focus:border-blue-500 outline-none" />
         <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
          <Search></Search>
         </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic></Mic>
        
        </Button>
      </form>
          <div className={`  flex-shrink-0 md:gap-2 ${showfullwidht ?"hidden ":"flex"}`}>
              <Button onClick={()=>{
                setfullwidth(true)
              }} variant="ghost" size="icon" className="md:hidden">
       <Search></Search>
            </Button>
              <Button type="button" size="icon" className="md:hidden ">
          <Mic></Mic>
        
        </Button>
            
            <Button variant="ghost" size="icon">
                <Upload></Upload>
            </Button>
            <Button variant="ghost" size="icon">
           <Bell></Bell>
            </Button>
            <Button variant="ghost" size="icon">
              <User></User>
            </Button>
          </div>
    </div>
}

type PageHeaderSectionProps={
  hidden?:boolean
}

export function PageHeaderFirstSection({
hidden = false,
}:PageHeaderSectionProps){
     const {toggle}=SidebarContextConsumer()
    return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" />
      </a>
    </div>
  )
}