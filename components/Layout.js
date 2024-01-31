import Head from "next/head";

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Taylor Swift Discography</title>
            </Head>

            <main>{children}</main>
        </>
    );
}