import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { GridItem } from '../../components/gridItem/GridItem'
import { GridItemHeader } from '../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../components/gridItem/GridItemContent'
interface MarkdownContentProps {
  title: string
  markdown: string
}

const MarkdownContent = ({ ...props }: MarkdownContentProps) => {
  return (
    <GridItem>
      <GridItemHeader title={props.title} />
      <GridItemContent>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(props.markdown)),
          }}
        ></div>
      </GridItemContent>
    </GridItem>
  )
}

export default MarkdownContent
