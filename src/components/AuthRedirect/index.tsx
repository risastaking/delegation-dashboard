import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn';

interface AuthRedirectPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirect = ({
  children,
  requireAuth = true
}: AuthRedirectPropsType) => {
  const isLoggedIn = useGetIsLoggedIn();

  if (isLoggedIn && !requireAuth) {
    return <Navigate to={'/dashboard'} />;
  }

  if (!isLoggedIn && requireAuth) {
    return <Navigate to={'/unlock'} />;
  }

  return <>{children}</>;
};