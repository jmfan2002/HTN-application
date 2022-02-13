import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <Form action="/" method="get">
      <Row className="align-items-center">
        <Col sm={20}>
          <Form.Group>
            <Form.Control type="text" placeholder="Search Events" value={searchQuery} onInput={e => setSearchQuery((e.target as HTMLTextAreaElement).value)} name="s" />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Searchbar;