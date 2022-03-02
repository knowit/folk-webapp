import * as React from 'react'
import { Links } from '../../../api/data/employee/employeeApiTypes'
import { makeStyles } from '@material-ui/core/styles'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { mapLinkKeyToLabel } from '../../../utils/cvLinkHelpers'
import GetApp from '@material-ui/icons/GetApp'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'
import { withStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'inline-flex',
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  linkText: {
    textDecoration: 'underline',
  },
}))

const DownloadIcon = withStyles({
  root: {
    marginRight: '0.2em',
  },
})(GetApp)

interface Props {
  links?: Links
  isLoading?: boolean
}

export function CvDownloadList({ links, isLoading }: Props) {
  const classes = useStyles()

  if (isLoading) {
    return <MultiLineSkeleton />
  }

  const downloadLinks = links ? Object.entries(links) : []

  if (downloadLinks.length === 0) {
    return <FallbackMessage message="Fant ingen CV å laste ned." />
  }

  return (
    <ExperienceList>
      {downloadLinks.map(([linkKey, linkUrl]) => (
        <ExperienceListItem key={linkKey}>
          <a href={linkUrl} download className={classes.link}>
            <DownloadIcon />
            <span className={classes.linkText}>
              {mapLinkKeyToLabel(linkKey)}
            </span>
          </a>
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
