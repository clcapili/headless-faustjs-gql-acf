import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

const GET_SONG_DETAILS = gql`
    query GetSongDetails($songSlug: ID!) {
        song(id: $songSlug, idType: SLUG) {
        singleSong {
            songTitle
            length
            lyrics
            genre {
            nodes {
                name
            }
            }
        }
        }
    }
`;

export default function Song() {
    const { query = {} } = useRouter();
    const { songSlug } = query;

    const { loading, error, data } = useQuery(GET_SONG_DETAILS, {
        variables: { songSlug }
    });

    const songData = data?.song?.singleSong;

    useEffect(() => {
        return () => {
            
        };
    }, []);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <Layout>
            <Link href="/albums">
                <p>View All Albums</p>
            </Link>

            <h1>{songData.songTitle}</h1>
            <p>Song Length: {songData.length}</p>
            <p>Genre:
                {songData.genre.nodes.map((genre) => genre.name)
                .join(", ")}
            </p>

            <h3>Lyrics</h3>
            <div dangerouslySetInnerHTML={{ __html: songData.lyrics }}></div>
        </Layout>
    );
}