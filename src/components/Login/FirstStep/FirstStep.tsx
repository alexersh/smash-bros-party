import { useState, FormEvent, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useStores } from '../../StoreProvider/StoreProvider';
import { observer } from 'mobx-react';

const FirstStep = observer(() => {
  const {
    store: { handleNameChange, handleWishChange, wish, name, setCurrentStep, currentStep },
  } = useStores();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Go to character selection
    setCurrentStep('2');
  };

  return (
    <>
      <Modal centered show={currentStep === '1'}>
        <Modal.Header>
          <Modal.Title>Здраствуй, путник!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Здесь напиши кто ты (максимум 8 символов)</Form.Label>
              <Form.Control
                required
                type="text"
                autoComplete="off"
                placeholder="Ага, тут твоё погоняло"
                minLength={1}
                maxLength={8}
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              <Form.Control.Feedback>Первый шаг позади!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>А здесь напиши что-то хорошее для парней</Form.Label>
              <Form.Control
                required
                as="textarea"
                autoComplete="off"
                value={wish}
                minLength={2}
                onChange={(e) => handleWishChange(e.target.value)}
                rows={3}
              />
              <Form.Control.Feedback type="invalid">Давай пиши!</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Пустите меня внутрь!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default FirstStep;
