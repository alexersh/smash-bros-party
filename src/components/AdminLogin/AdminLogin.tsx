import { observer } from 'mobx-react';
import { useState, FormEvent, useEffect } from 'react';
import { Modal, ModalHeader, ModalTitle, Form, Button } from 'react-bootstrap';
import { useStores } from '../StoreProvider/StoreProvider';

const correctLogin = 'admin';
const correctPassword = '123321';

const AdminLogin: React.FC = observer(() => {
  const {
    store: { isAdminLogged, setIsAdminLogged },
  } = useStores();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleLoginChange = (value: string) => {
    setLogin(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login === correctLogin && password === correctPassword) {
      setIsAdminLogged(true);
      setShow(false);
    }
  };

  useEffect(() => {
    if (!isAdminLogged) {
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal centered show={show}>
      <ModalHeader>
        <ModalTitle>Admin Login</ModalTitle>
      </ModalHeader>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Login</Form.Label>
            <Form.Control
              required
              type="text"
              autoComplete="off"
              placeholder="Login"
              value={login}
              isInvalid={login !== correctLogin}
              onChange={(e) => {
                handleLoginChange(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">Incorrect credentials</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              autoComplete="off"
              placeholder="Login"
              value={password}
              isInvalid={password !== correctPassword}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">Incorrect credentials</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export default AdminLogin;
