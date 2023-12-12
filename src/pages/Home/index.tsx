import { AuthRedirect } from 'components/AuthRedirect/index.js';

const Home = () => {
  return <AuthRedirect requireAuth={true} />;
};

export default Home;
