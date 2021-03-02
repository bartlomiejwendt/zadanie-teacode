import React from 'react';
import "./contact.css";

interface IContact {
  id: number,
  avatar: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
}

interface Props {
  id: number,
  avatar: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
  checked: IContact[],
  setChecked: React.Dispatch<React.SetStateAction<IContact[]>>
}

export const Contact: React.FC<Props> = (props) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const { id, avatar, first_name, last_name, checked, setChecked } = props;

  React.useEffect(() => {
    if (checked.find((contact) => contact.id === id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

  }, [id, checked]);

  const handleAddToChecked = () => {
    if (isChecked) {
      let newArr = checked.filter((contact) => contact.id !== id);

      setChecked(newArr);
    } else {
      setChecked((prevState) => [
        ...prevState,
        props
      ])
    }
  }
 
  return (
    <tr>
      <td>
        <img src={avatar} alt="contact" className="contact__avatar" />
      </td>
      <td>
        {`${first_name} ${last_name}`}
      </td>
      <td>
        <input type="checkbox" onClick={handleAddToChecked} checked={isChecked} onChange={() => setIsChecked((prevState) => !prevState)} />
      </td>
    </tr>
  )
}
