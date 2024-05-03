import { useEffect, useRef, useState } from "react"
import { formatduration } from "../utils/formatduration"
import { formattimeago } from "../utils/fromatago"

type VideoGridItemProps = {
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

const viewsformat= new Intl.NumberFormat(undefined,{
  notation:"compact"
})

export function VediogridItem({  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}:VideoGridItemProps){
        const [vedioplaying,setvedioplaying]=useState(false)
        const vedioref=useRef<HTMLVideoElement>(null)
        
        useEffect(()=>{
          if(vedioref.current==null) return

          if(vedioplaying){
          vedioref.current.currentTime=0;
          vedioref.current.play()
          } else{
            vedioref.current.pause()
          }
        },[vedioplaying])
       

        return <div className="flex flex-col gap-2"
        onMouseEnter={()=>{
          setvedioplaying(true)
        }}
        onMouseLeave={()=>{
          setvedioplaying(false)
        }}>
        <a href={`watch?v=${id}`} className="relative aspect-video">
            <img src={thumbnailUrl}
             className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${vedioplaying ? "rounded-none":"rounded-xl"}`} />
            <div className="absolute bottom-1 right-1 bg-secondary-dark text-sem text-secondary 
            px-.5 rounded">{formatduration(duration)}</div>
            <video className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${vedioplaying ? "opacity-100 delay-200":"opacity-0" }`}
             ref={vedioref} muted playsInline src={videoUrl} ></video>
        </a>
        <div className="flex gap-2">
          <a href={`/@${channel.id}` } className="flex-shrink-0">
            <img className="w-12 h-12 rounded-full" src={channel.profileUrl}  />
          </a>
          <div className="flex flex-col">
            <a href={`/watch?v=${id}`} className="font-bold">
              {title}
            </a>
            <a href={`/@watch?v=${channel.id}`} className="text-secondary-text  text-sm">
              {channel.name}
            </a>
            <div className="text-secondary-text text-sm ">
              {viewsformat.format(views)} Views * {formattimeago(postedAt)}
            </div>
          </div>
        </div>
        </div>
}