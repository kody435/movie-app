import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql, GraphQLClient } from 'graphql-request'
import BlogCard from '../components/BlogCard'

const graphcms = new GraphQLClient("https://api-eu-central-1.graphcms.com/v2/cl3ncltbk3tw301xkeczu1puc/master")

const QUERY = gql`
  {
    posts {
      title
      slug
      url
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Octulus</title>
        <meta name="description" content="WebApp made by Param Patel, to watch posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.div3}>
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            url={post.url}
          />
        ))}
      </main>
      
    </div>
  )
}
