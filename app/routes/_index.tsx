import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import AuthSwitcher from "~/components/auth/AuthSwitcher";

import WrapperContainer from "~/components/Wrapper/Wrapper";
import { signin, signup } from "~/server/services/auth.server";
export const meta: MetaFunction = () => {
  return [
    { title: "Authentication " },
    { name: "description", content: "Welcome to Remix!" },
  ];
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
    return redirect('/user')
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



