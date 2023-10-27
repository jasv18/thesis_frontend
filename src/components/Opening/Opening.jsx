import { useState, useEffect } from 'react';
import BlocksShuffleThree from '../../icons/BlocksShuffleThree';
import ListOfPayrolls from '../ListOfPayrolls';
import Spinner1 from '../../icons/Spinner1';
import useSelectedServer from '../../hook/useSelectedServer';

export const Opening = ({ selectDatabaseDispatcher, databaseSelected, isLoading, payrolls }) => {
  const [datName, setDatName] = useState('');
  const [selectedPayroll, setSelectedPayroll] = useState([]);
  const [isOpsLoading, setIsOpsLoading] = useState(false);
  const { serverSelected, selectServerDispatcher } = useSelectedServer();

  useEffect(() => {
    if (!databaseSelected) {
      setSelectedPayroll([]);
    }
  }, [databaseSelected]);

  // selectServerDispatcher({ type: 'SELECT_SERVER', payload: serverSelected }) --it's useful
  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelectedPayroll(selectedPayroll.concat(target.value));
    } else {
      setSelectedPayroll(selectedPayroll.filter(payroll => payroll !== target.value));
    }
  };

  const handleInputChange = ({ target }) => {
    const regex = /^[A-Za-z0-9_]*$/g;
    if (target.value === '' || regex.test(target.value)) {
      setDatName(target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedPayroll);
  };

  const handleCancellation = () => selectDatabaseDispatcher({ type: 'DESELECT_DATABASE' });

  if (isLoading) {
    return (
      <div className='md:h-full w-full flex place-content-center place-items-center text-light-pink'>
        <BlocksShuffleThree className='h-16 m-0' />
      </div>
    );
  }

  if (databaseSelected) {
    return (
      <>
        <h2 className='w-full border-b-4 border-b-dark-blue text-dark-blue border-2 text-center rounded uppercase font-bold text-sm px-3'>aperturar bd</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 p-4 text-base'>
            <div>
              <label htmlFor='newdatabasename' className='block mb-2 text-gray-900'>Nombre de base de datos</label>
              <input
                type='text'
                className='border-2 border-gray-400 rounded-lg p-2 w-10/12 disabled:bg-gray-100'
                name='newdatabasename'
                id='newdatabasename'
                autoComplete='off'
                placeholder='Nombre de base de datos'
                required
                autoFocus
                onChange={handleInputChange}
                maxLength={40}
                value={datName} />
            </div>
            {payrolls
              ? (
                <div>
                  <label className='block mb-2 text-gray-900'>Escoger nóminas a preservar en el proceso de apertura</label>
                  <ListOfPayrolls payrolls={payrolls} handleChange={handleChange} selectedPayroll={selectedPayroll} />
                </div>
              )
              : (
                <div className='uppercase font-semibold text-dark-blue'>
                  No se han encontrado nóminas
                </div>
              )}
            <div className='flex justify-end gap-2'>
              {isOpsLoading
                ? (
                  <button type='button' className='text-gray-900 bg-white hover:bg-gray-100 disabled:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:disabled:bg-gray-700' disabled>
                    <Spinner1 className='w-6 h-6 mr-2 animate-spin fill-blue-600' />
                    <strong>En proceso...</strong>
                  </button>
                )
                : (
                  <>
                    <button type='submit' className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                      <strong>Generar</strong>
                    </button>
                    <button onClick={handleCancellation} type='button' className='text-white bg-gray-800 hover:bg-gray-700 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-100'>
                      <strong>Cancelar</strong>
                    </button>
                  </>
                )}
            </div>
          </div>
        </form>
      </>
    );
  }

  return (
    <div className='md:h-full w-full flex place-content-center place-items-center text-light-pink uppercase font-bold sm:text-sm text-xs min-w-max sm:mt-0 mt-10'>
      No hay base de datos seleccionada
    </div>
  );
};
