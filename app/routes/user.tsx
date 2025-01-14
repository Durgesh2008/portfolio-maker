import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import WrapperContainer from '~/components/Wrapper/Wrapper';
import useCurrentUserData from '~/Hook/useCurrentUserData';
import { destroySession, getSession } from '~/server/services/session.server';


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { userId, username } = await useCurrentUserData(request);
    if (userId) {
        return { userId, username };
    }

    return redirect('/');
};

export async function action({ request }: ActionFunctionArgs) {
    // const url = new URL(request.url);
    // const mode = url.searchParams.get("mode");

    const session = await getSession(request.headers.get('Cookie'));
    const cookie = await destroySession(session);
    return redirect('/', {
        headers: {
            'Set-Cookie': cookie,
        },
    });

}
const user = () => {
    const data = useLoaderData()
    return (
        <WrapperContainer>
            {data?.userId}
            {data?.username}
            <Form method="post">
                <Button type="submit">
                    Logout
                </Button>
            </Form>



        </WrapperContainer>
    )
}

export default user
