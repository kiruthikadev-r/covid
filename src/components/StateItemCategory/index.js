import {Link} from 'react-router-dom'

const StateItemCategory = props => {
  const {each, clickedCategory} = props
  const {name} = each
  const onClickedCategory = () => {
    clickedCategory(name)
  }
  return (
    <li className={`list-item-home ${each.color}`} onClick={onClickedCategory}>
      <p className={`list-item-text ${each.color}`}>{each.name}</p>
      <img
        className={`list-item-image ${each.color}`}
        src={each.imageUrl}
        alt={each.name}
      />
      <p className={`list-item-count ${each.color}`}>{each.count}</p>
    </li>
  )
}
export default StateItemCategory
