import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";

const GET_ALBUM_DETAILS = gql`
    query GetAlbumDetails($albumSlug:ID!) {
        album(id: $albumSlug, idType: SLUG) {
        singleAlbum {
            albumTitle
            cover {
                node {
                    altText
                    mediaItemUrl
                }
            }
            releaseDate
            trackList {
                nodes {
                    ... on Song {
                    id
                    slug
                        singleSong {
                            songTitle
                        }
                    }
                }
            }
        }
        }
    }
`;

export default function Album() {
    const { query = {} } = useRouter();
    const { albumSlug } = query;

    const { loading, error, data } = useQuery(GET_ALBUM_DETAILS, {
        variables: { albumSlug }
    });

    const albumData = data?.album?.singleAlbum;

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <Layout>
            <Link href="/albums">
                <p>View All Albums</p>
            </Link>

            <h1>{albumData.albumTitle}</h1>
            <p>Released on {albumData.releaseDate}</p>
            <img src={albumData?.cover.node.mediaItemUrl} alt={albumData.cover.node.altText} />

            <h3>Track List</h3>

            <ol>
                {albumData.trackList.nodes.map((track) => (
                    <li key={track.id}>
                        <Link href={`/songs/${track.slug}`}>
                            <p>{track.singleSong.songTitle}</p>
                        </Link>
                    </li>
                ))}
            </ol>
        </Layout>
    );
}