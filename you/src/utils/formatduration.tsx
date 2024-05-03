//numberformat a built-in JavaScript function that allows formatting of numbers according to locale-specific rules
const leadingzoneformator=new Intl.NumberFormat(undefined,{
    minimumIntegerDigits:2,
})

export function formatduration(duration:number){
  const hours=Math.floor(duration/60/60)
  const minutes=Math.floor((duration-hours*60*60)/60)
  const seconds=duration%60

  if(hours >0){
    return `${hours}:${leadingzoneformator.format(minutes)}:
    ${leadingzoneformator.format(seconds)}`
  }

  return `${minutes}:${leadingzoneformator.format(seconds)}`
}