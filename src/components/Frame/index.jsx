const Frame = ({ children, tittle, className }) => {
  return (
    <div data-tittle={tittle.toLowerCase()} className={`border-2 relative before:absolute before:content-[attr(data-tittle)] before:whitespace-nowrap before:left-[10%] before:-top-4 before:border-2 before:border-inherit before:rounded-2xl before:text-base before:font-bold pt-5 pb-4 pl-4 pr-2 before:bg-inherit before:px-2 before:z-10 rounded-lg bg-inherit ${className}`}>
      {children}
    </div>
  )
}

export default Frame
