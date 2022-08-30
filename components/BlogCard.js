import Link from "next/link";
import styles from '../styles/Home.module.css'

function BlogCard({title, slug}) {
  return (
      <div className={styles.div1}>
      <Link href={`/posts/${slug}`} className={styles.link}>
        <div className={styles.div2}>
          <h1 className={styles.h1}>{title}</h1>
        </div>
      </Link>
    </div>
    
  )
}

export default BlogCard