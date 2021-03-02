import React from 'react';
import "./app.css";
import { Container, Form, FormControl } from 'react-bootstrap';

// components
import { List } from './components/list/List';
interface Contact {
  id: number,
  avatar: string,
  email: string,
  first_name: string,
  last_name: string,
  gender: string,
}

const App: React.FC = () => {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [searchTerm, setTerm] = React.useState<string>("");
  const [checked, setChecked] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    const ENDPOINT = "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json";

    const fetchData = async () => {
      const response = await fetch(ENDPOINT);
      const dataJson = await response.json();

      let sortByLastName = dataJson;

      sortByLastName.sort((a: Contact, b: Contact) => {
        if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
          return -1;
        }

        if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
          return 1;
        }

        return 0
      })

      setContacts(sortByLastName)
    };

    fetchData();
  }, []);

  const handleUpdateSearchTerm = (e: React.FormEvent<HTMLFormElement>) => {
    const { value } = e.target as HTMLInputElement;

    setTerm(value);
  }

  const handleFilterContacts = (value: string) => {
    return (contacts: any) => {
      return contacts.first_name.toLowerCase().includes(value.toLowerCase()) || contacts.last_name.toLowerCase().includes(value.toLowerCase());
    }
  }

  // display all ids of selected contacts
  let tempArr: number[] = [];

  checked.forEach((el) => {
    tempArr.push(el.id);
  });

  console.log(tempArr);

  return (
    <Container>
      <h1 className="app__heading">Contacts</h1>

      <Form className="app__form"
        onChange={(e) => handleUpdateSearchTerm(e)}
      >
        <Form.Label>Search</Form.Label>
        <FormControl 
          type="text"
          placeholder="Filter users by first_name or last_name"
        />
      </Form>
      
      <List 
        contacts={contacts} 
        handleFilterContacts={handleFilterContacts} 
        searchTerm={searchTerm} 
        checked={checked}
        setChecked={setChecked}
      />
    </Container>
  )
}

export default App

