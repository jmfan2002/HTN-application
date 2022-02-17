import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface LoginProps {
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginModal = ({ setEmail, setPassword }: LoginProps) => {
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	let email: string;
	let password: string;
	const submitForm = () => {
		setEmail(email);
		setPassword(password);
	};
	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Log In
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Log In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" onInput={e => email = (e.target as HTMLTextAreaElement).value} />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" onInput={e => password = (e.target as HTMLTextAreaElement).value} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => { submitForm(); handleClose(); }}>
						Log In
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default LoginModal;