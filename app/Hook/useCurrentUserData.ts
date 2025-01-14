import { getSession } from '~/server/services/session.server';

const useCurrentUserData = async(request:Request) => {
    const session = await getSession(request.headers.get('Cookie'));
    const userId = session.get('userId') as string;
    const username = session.get('username') as string;
  
  return (
    {userId,username}
  )
}

export default useCurrentUserData
