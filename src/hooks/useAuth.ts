import { useContext } from 'react';
import { AuthentificationContext, AuthentificationProperties } from '../contexts/auth';

const useAuth = () => useContext<AuthentificationProperties>(AuthentificationContext);

export default useAuth;
