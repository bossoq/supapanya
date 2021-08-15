import { useRouter } from 'next/router'
import { BlogRender } from '../../components/elements'

const Blog = (): JSX.Element => {
  const router = useRouter()
  const { postName } = router.query
  let postLink: string = ''
  if (postName) {
    postLink = postName.toString()
  }

  return (
    <BlogRender postName={postLink} />
  )
}

export default Blog
