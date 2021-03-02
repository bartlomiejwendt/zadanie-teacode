import React from 'react'
import { Table } from 'react-bootstrap'

// components
import { Contact } from '../contact/Contact'

interface IContact {
  id: number,
  avatar: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
}

interface Props {
  contacts: IContact[],
  handleFilterContacts: (value: string) => (contacts: any) => any,
  searchTerm: string,
  checked: IContact[],
  setChecked: React.Dispatch<React.SetStateAction<IContact[]>>
}

export const List: React.FC<Props> = (props) => {
  const { contacts, handleFilterContacts, searchTerm, checked, setChecked } = props;
  
  return (
    <Table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Full name</th>
          <th>Check</th>
        </tr>
      </thead>
      <tbody>
        {
          contacts && contacts.length ? (
            contacts.filter(handleFilterContacts(searchTerm)).map((contact) => <Contact key={contact.id} {...contact} checked={checked} setChecked={setChecked} />)
          ) : (
            <tr>
              <td colSpan={6}>No contacts</td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}
