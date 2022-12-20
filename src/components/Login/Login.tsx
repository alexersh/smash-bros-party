import { useStores } from '../StoreProvider/StoreProvider';
import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const Login = observer(() => {
  const {
    store: { isLoggedIn, setCurrentStep, currentStep },
  } = useStores();

  useEffect(() => {
    if (typeof window !== undefined && !isLoggedIn) {
      setCurrentStep('1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {currentStep === '1' && <FirstStep />}
      {currentStep === '2' && <SecondStep />}
    </div>
  );
});

export default Login;
