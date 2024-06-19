import Dropdown from 'react-bootstrap/Dropdown';
import './dropDown.css'
function DropDown() {

 
  return (
    <Dropdown className='dropDown'>
      <Dropdown.Toggle className='dropDownToogle'>
        Kerala
      </Dropdown.Toggle>

      <Dropdown.Menu className='dropDownMenu'>
        <Dropdown.Item href="#/action-1">Maharashtra</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Karnadaka</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Tamil Nadu</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;