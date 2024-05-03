import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

//cva generates the css class utility generator named buttonstyled 
 export const buttonstyle=cva(["transition-colors"],{
    variants:{
        variant:{
            defualt:["bg-secondary","hover:bg-secondary-hover"],
            ghost:["hover:bg-gray-100"],
            dark:["bg-secondary-dark","hover:bg-secondary-dark-hover","text-secondary"]
        }
       , size:{
            defualt:["rounded","p-2"],
            icon:["rounded-full","w-10 ","h-10","flex","items-center","justify-center","p-2.5 "]
        }
    },
    
    defaultVariants:{
        variant:"defualt",
        size:"defualt"
    },
})
//variant props that uses type safety with dealing with compoents variants in cva
type ButtonProps=VariantProps<typeof buttonstyle> &ComponentProps<"button">
 

export function Button({variant,size,className,...props}:ButtonProps){ 
    return ( <button {...props} 
    className={twMerge(buttonstyle({variant,size}),className)}> 

    </button>
    )
}