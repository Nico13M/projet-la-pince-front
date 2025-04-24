import { MenuIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const BurgerMenuButton = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void
}) => {
  return (
    <>
      {mobileMenuOpen ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Fermer le menu"
          className="text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <XIcon />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Ouvrir le menu"
          className="text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </Button>
      )}
    </>
  )
}
