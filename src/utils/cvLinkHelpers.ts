import { CvLinks } from '../api/data/employee/employeeApiTypes'

const linkLabels: Record<keyof CvLinks, string> = {
  no_pdf: 'Norsk, PDF',
  int_pdf: 'Engelsk, PDF',
  no_word: 'Norsk, Word',
  int_word: 'Engelsk, Word',
}

export function isValidLinkKey(linkKey: string): linkKey is keyof CvLinks {
  return ['no_pdf', 'int_pdf', 'no_word', 'int_word'].includes(linkKey)
}

export function mapLinkKeyToLabel(linkKey: string) {
  if (!isValidLinkKey(linkKey)) {
    return linkKey
  }
  return linkLabels[linkKey]
}
