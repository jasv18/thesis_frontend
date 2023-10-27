import { useState } from 'react'
import PayrollItem from '../PayrollItem'

const ListOfPayrolls = ({ payrolls, handleChange, selectedPayroll, setSelectedPayroll }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [orderBy, setOrderBy] = useState('cod')

  const handleSelectionChange = ({ target }) => {
    if (target.checked) {
      if (payrolls) {
        const codPayrolls = payrolls.map(payroll => payroll.codnom)
        setSelectedPayroll([].concat(...codPayrolls))
      }
    } else {
      setSelectedPayroll([])
    }
    setIsSelected(target.checked)
  }

  const handleOrderChange = ({ target }) => setOrderBy(target.value)

  return (
    <>
      <label className='block mb-2 text-gray-900'>Escoger nóminas a preservar en el proceso de apertura</label>
      <div className='border-2 border-dark-pink rounded-md py-4 pl-4 pr-2'>
        <div className='flex flex-row justify-start gap-3 mb-3 px-5 py-3 border-dark-pink border rounded-md'>
          <div>
            <label htmlFor='underline_select' className='sr-only'>Underline select</label>
            <select id='underline_select' defaultChecked='cod' className='block py-2 px-0 w-full text-sm cursor-pointer text-gray-400 bg-transparent border-0 border-b-2 border-dark-gray appearance-none focus:text-gray-600 focus:outline-none focus:ring-0 focus:border-dark-blue peer' onChange={handleOrderChange}>
              <option value='cod'>Ordenar por codigo</option>
              <option value='des'>Ordenar por descripción</option>
            </select>
          </div>
          <div>
            <input type='checkbox' id='selection' name='selection' className='peer/selection hidden' onChange={handleSelectionChange} />
            <label htmlFor='selection' className='ring-1 ring-dark-gray h-full rounded-md hover:bg-gray-400 py-1 px-3 flex gap-3 justify-start text-gray-400 items-center text-sm cursor-pointer hover:text-white peer-checked/selection:bg-dark-blue peer-checked/selection:text-white peer-checked/selection:font-bold peer-checked/selection:hover:bg-gray-600'>
              {isSelected ? 'Anular selección' : 'Seleccionar a todos'}
            </label>
          </div>
        </div>
        <ul className='overflow-y-auto pe-2 min-h-[150px] h-[250px] flex flex-col gap-2'>
          {
            payrolls
              .toSorted((payrollA, payrollB) => {
                const paramA = ((orderBy === 'cod') ? payrollA.codnom.toUpperCase() : payrollA.desnom.toUpperCase())
                const paramB = ((orderBy === 'cod') ? payrollB.codnom.toUpperCase() : payrollB.desnom.toUpperCase())
                if (paramA < paramB) {
                  return -1
                } else if (paramA > paramB) {
                  return 1
                }
                return 0
              })
              .map(payroll => <PayrollItem key={payroll.codnom} payroll={payroll} handleChange={handleChange} selectedPayroll={selectedPayroll} />)
          }
        </ul>
      </div>
    </>
  )
}

export default ListOfPayrolls
