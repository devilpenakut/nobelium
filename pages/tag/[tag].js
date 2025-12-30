import { getAllPosts, getAllTagsFromPosts } from '@/lib/notion'
import SearchLayout from '@/layouts/search'

export default function Tag({ tags, posts, currentTag }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag

  try {
    const posts = await getAllPosts({ includePages: false })
    const tags = getAllTagsFromPosts(posts)
    const filteredPosts = posts.filter(
      post => post && post.tags && post.tags.includes(currentTag)
    )

    return {
      props: {
        tags,
        posts: filteredPosts,
        currentTag
      },
      revalidate: 60
    }
  } catch (e) {
    // Kalau source (Notion/API) lagi error (mis. 502), jangan bikin build gagal
    return {
      notFound: true,
      revalidate: 60
    }
  }
}

export async function getStaticPaths() {
  try {
    const posts = await getAllPosts({ includePages: false })
    const tags = getAllTagsFromPosts(posts)
    return {
      paths: Object.keys(tags).map(tag => ({ params: { tag } })),
      fallback: true
    }
  } catch (e) {
    // Kalau gagal ambil tags saat build, tetap allow runtime fallback
    return {
      paths: [],
      fallback: true
    }
  }
}
