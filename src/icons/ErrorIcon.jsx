const ErrorIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='0'
      viewBox='-1.7 0 20.4 20.4'
      preserveAspectRatio='xMinYMin slice'
      className={`cf-icon-svg ${className}`}
    >
      <path d='M16.417 10.283A7.917 7.917 0 118.5 2.366a7.916 7.916 0 017.917 7.917zm-6.804.01l3.032-3.033a.792.792 0 00-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 00-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 001.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 001.12-1.12z' />
    </svg>
  )
}

export default ErrorIcon
