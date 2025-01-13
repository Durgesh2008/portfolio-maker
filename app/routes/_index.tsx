import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import AuthSwitcher from "~/components/auth/AuthSwitcher";
import SignIn from "~/components/auth/SignIn";
import SignUp from "~/components/auth/Signup";
import WrapperContainer from "~/components/Wrapper/Wrapper";
export const meta: MetaFunction = () => {
  return [
    { title: "Authentication " },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const newUser = {
    email: body.get("email"),
    password: body.get("password"),
  };

  console.log(newUser);
  return redirect("/user");
}

const Index = () => {
 
  return (
    <WrapperContainer>
    <AuthSwitcher/>

    </WrapperContainer>
  );
};

export default Index;



