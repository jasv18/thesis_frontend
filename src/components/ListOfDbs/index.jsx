import DbItem from '../DbItem'

const ListOfDbs = ({ dbs }) => {
  return (
    <div className='pe-2 min-h-[150px] h-[250px] flex flex-col gap-2'>
      {dbs.map(db => <DbItem key={db.id} db={db} />)}
    </div>
  )
}

export default ListOfDbs
