import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import { signInWithRedirect, signOut } from 'aws-amplify/auth'
import { useUserInfo } from '../hooks/useUserInfo'
import { useNavigate } from 'react-router-dom'

const ButtonBaseStyled = styled(ButtonBase)(() => ({
  fontSize: '15px',
  fontWeight: 'bold',
  height: 'inherit',
  margin: '3px',
}))

export default function LoginLogoutButton() {
  const { setUser, isAuthenticated } = useUserInfo()
  const navigate = useNavigate()

  async function handleSignIn() {
    await signInWithRedirect({
      provider: {
        custom: 'AzureAD',
      },
    })

    navigate('/start', { replace: true })
  }

  async function handleSignOut() {
    await signOut()
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <ButtonBaseStyled
      onClick={() => (isAuthenticated ? handleSignOut() : handleSignIn())}
    >
      {isAuthenticated ? 'Logg ut' : 'Logg inn'}
    </ButtonBaseStyled>
  )
}
