import * as React from 'react'
import { CvLinks } from '../../../api/data/employee/employeeApiTypes'
import { styled } from '@mui/material/styles'
import { DownloadIcon } from '../../../assets/Icons'
import { FallbackMessage } from './FallbackMessage'
import { ExperienceList } from './ExperienceList'
import { ExperienceListItem } from './ExperienceListItem'
import { MultiLineSkeleton } from '../../../components/skeletons/MultiLineSkeleton'
import { mapLinkKeyToLabel } from '../utils/cv-link-helpers'

const LinkStyled = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  color: theme.palette.text.primary,
  textDecoration: 'none',
}))
const LinkTextStyled = styled('span')(() => ({
  textDecoration: 'underline',
}))
const DownloadIconStyled = styled(DownloadIcon)(() => ({
  marginRight: '0.2em',
}))

interface Props {
  links?: CvLinks
  isLoading?: boolean
}

export function CvDownloadList({ links, isLoading }: Props) {
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
          <LinkStyled href={linkUrl} download>
            <DownloadIconStyled />
            <LinkTextStyled>{mapLinkKeyToLabel(linkKey)}</LinkTextStyled>
          </LinkStyled>
        </ExperienceListItem>
      ))}
    </ExperienceList>
  )
}
