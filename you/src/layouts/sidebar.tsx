import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, GamepadIcon, History, Home, Library, ListVideo, Music, NewspaperIcon, PlaySquare, Radio, Repeat, ShoppingBag } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonstyle } from "../compo/button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { SidebarContextConsumer } from "../context/sidebarcon";
import { Pageheader } from "./pageheader";


export function Sidebar() {
  const {isLargeOpen,isSmallOpen}=SidebarContextConsumer()
  return (
    <div>
      <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden ${isLargeOpen ?"lg:hidden": "lg:flex"}`}>
        <Smallsidebaritem Icon={Home} url="/" title="Home" />
        <Smallsidebaritem Icon={Repeat} title="Shorts" url="/shorts" />
        <Smallsidebaritem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
        <Smallsidebaritem Icon={Library} title="Library" url="/library" />
      </aside>
      {
        isSmallOpen && (
          <div onClick={close} className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50">
            
          </div>
        )
      }
      <aside    className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>

         <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <Pageheader />
        </div>
        <Largesidebar >
          <Largebaritem isactive IconorUrl={Home} url="/" title="Home" />
          <Largebaritem IconorUrl={Clapperboard} title="Subscriptions" url="/subscriptions" />
     
        </Largesidebar>
        <hr />
        <Largesidebar visibleitmecount={5}>
           <Largebaritem
            IconorUrl={Library}
            title="Library"
            url="/library"
          />
          <Largebaritem
            IconorUrl={History}
            title="History"
            url="/history"
          />
          <Largebaritem
            IconorUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <Largebaritem
            IconorUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map(playlist=>(
            <Largebaritem key={playlist.id} 
            IconorUrl={ListVideo}
              title={playlist.name}
            url={`/playlist?list${playlist.id}`}>

            </Largebaritem>
          )
          )}
        </Largesidebar>
        <hr />
        <Largesidebar visibleitmecount={4} title="Subscriptions">
          {subscriptions.map(subscription=>(
            <Largebaritem
            key={subscription.id}
            IconorUrl={subscription.imgUrl}
            title={subscription.channelName}
            url={`/@${subscription.id}`}>

            </Largebaritem>
          ))}
        </Largesidebar>
        <hr />
        <Largesidebar visibleitmecount={5} title="Explore">
           <Largebaritem
            IconorUrl={Music}
            title="music"
            url="/library"
          />
          <Largebaritem
            IconorUrl={Flame}
            title="flame"
            url="/history"
          />
          <Largebaritem
            IconorUrl={ShoppingBag}
            title="Shopping Bag"
            url="/your-videos"
          />
          <Largebaritem
            IconorUrl={Film}
            title="film"
            url="/playlist?list=WL"
          />
          <Largebaritem
            IconorUrl={Radio}
            title="Radio"
            url="/your-videos"
          />
          <Largebaritem
            IconorUrl={GamepadIcon}
            title="Gamepad"
            url="/playlist?list=WL"
          />
            <Largebaritem
            IconorUrl={NewspaperIcon}
            title="News"
            url="/playlist?list=WL"
          />
        </Largesidebar>
      </aside>
    </div>
  );
}

type SmallsideProps=
{     Icon:ElementType
    title:string,
    url:string,
   
}

function Smallsidebaritem({Icon,title,url}:SmallsideProps){
      return <a href={url}  className={twMerge(
        buttonstyle({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}>
        <Icon className="h-6 w-6"></Icon>
        <div className="text-sm">{title}</div>
      </a>
}
type LargebarProps={
  children:ReactNode,
  title:string,
  visibleitmecount:number
}


function Largesidebar({children,title,visibleitmecount=Number.POSITIVE_INFINITY}:LargebarProps){
   
   const childrenarray=Children.toArray(children).flat()
 const [isexpandes,setisexpanded]=useState(false);
    const expandedbutton=childrenarray.length > visibleitmecount
       const visiblechildren= isexpandes?childrenarray :childrenarray.slice(0,visibleitmecount)
       const ButtonIcon=isexpandes ? ChevronUp :ChevronDown
     
       return(
   <div>
    {title && <div className="ml-4 mt-2 text-lg mb-1" >{title} </div>}
    {visiblechildren}
    {expandedbutton && 
      <Button onClick={()=>{
        setisexpanded(e=>!e)
      }} variant="ghost" className="w-full flex items-center rounded-lg p-3 gap-4"> 
       <ButtonIcon className="w-6 h-6"></ButtonIcon>
       <div >{isexpandes? "show less":"show more"}</div>
      </Button>
    }
    </div>
     )
}
type LargesideProps={
  IconorUrl:ElementType |string,
  title:string,
  url:string,
  isactive:boolean
}
function Largebaritem({IconorUrl,title,url,isactive=false}:LargesideProps){
   return <a href={url} className={twMerge(buttonstyle({variant:"ghost"}),`w-full flex items-center rounded-lg p-3 gap-4 ${isactive ? "font-bold  bg-neutral-100 hover:bg-secondary":undefined}`)}>
     
     {typeof IconorUrl ==="string" ?(
      <img src={IconorUrl} className="w-6 h-6 rounded-full" />
     ):( <IconorUrl className="w-6 h-6"></IconorUrl>)}

   
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </div>
   </a>
    

}  