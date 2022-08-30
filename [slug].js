import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Home.module.css";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1.graphcms.com/v2/cl3ncltbk3tw301xkeczu1puc/master"
);

const QUERY = gql`
  query post ($slug: String!){
    post(where: { slug: $slug }) {
      title
      slug
      url
      desc
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY,{ slug });
  const post = data.post;
  return {
    props: {
      post,
    },
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.main}>
      <div>
        <iframe
          id="iframe"
          src={post.url}
          width="100%"
          height="100%"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
        <div className={styles.divi}>
          <h1 className={styles.h2}>{post.title}</h1>
          <details className={styles.details}>
            <summary className={styles.summary}>DESCRIPTION</summary>
            <p className={styles.para}>{post.desc}</p>
          </details>
        </div>
      </div>
    </main>
  );
}
