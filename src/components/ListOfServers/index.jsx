import ListOf from '../ListOf'
import ServerItem from '../ServerItem'

const ListOfServers = ({ servers }) => {
  return (
    <ListOf>
      {servers.map(server => <ServerItem key={server.id} server={server} />)}
    </ListOf>
  )
}

export default ListOfServers
