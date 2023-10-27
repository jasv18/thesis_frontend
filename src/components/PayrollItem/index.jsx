const PayrollItem = ({ payroll, handleChange, selectedPayroll }) => {
  const { codnom, desnom } = payroll
  return (
    <li>
      <input type='checkbox' id={codnom} name='payrollbox' value={codnom} checked={selectedPayroll?.includes(codnom)} onChange={handleChange} className='peer/payroll hidden' />
      <label htmlFor={codnom} className='rounded-md hover:bg-gray-400 py-1 px-3 flex gap-3 justify-start items-center text-sm cursor-pointer peer-checked/payroll:bg-dark-blue peer-checked/payroll:text-white peer-checked/payroll:font-bold peer-checked/payroll:hover:bg-gray-600'>
        <p>({codnom})</p>
        <p>{desnom}</p>
      </label>
    </li>
  )
}

export default PayrollItem
