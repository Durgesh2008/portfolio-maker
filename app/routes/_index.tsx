import { LoaderFunctionArgs, redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import AuthSwitcher from "~/components/auth/AuthSwitcher";

import WrapperContainer from "~/components/Wrapper/Wrapper";
import useCurrentUserData from "~/Hook/useCurrentUserData";
import { signin, signup } from "~/server/services/auth.server";
import { commitSession, getSession } from "~/server/services/session.server";
export const meta: MetaFunction = () => {
  return [
    { title: "Authentication " },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userId } = await useCurrentUserData(request);
  if (userId) {
    return redirect("/user")
  }

  return null;
};
export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");
  const authMode = mode ? mode : 'signin';
  const body = await request.formData();
  if (authMode === 'signin') {
    const result = await signin(body.get("email") as string, body.get("password") as string)
    if (result.status !== 200) {
      return result;
    }
    const session = await getSession(request.headers.get('Cookie'));

    session.set('userId', result?.data._id);
    session.set('username', result?.data.username);

    const cookie = await commitSession(session);

    return redirect('/user', {
      headers: {
        'Set-Cookie': cookie,
      },
    });

  } else {
    const result = await signup(body.get("email") as string, body.get("password") as string, body.get("username") as string)
    if (result.status !== 201) {
      return result;
    }
    return redirect('/')
  }

}

const Index = () => {
  return (
    <WrapperContainer>
      <AuthSwitcher />

    </WrapperContainer>
  );
};

export default Index;



