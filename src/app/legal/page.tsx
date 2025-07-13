import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, Scale, Shield } from 'lucide-react'
import Link from 'next/link'

export default function LegalIndexPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          <h1 className="text-foreground text-3xl font-bold">
            Informations légales
          </h1>
          <p className="text-muted-foreground mt-2">
            Consultez nos documents légaux et politiques de confidentialité
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Mentions légales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Informations sur l'éditeur du site, l'hébergement et les
                responsabilités légales.
              </p>
              <Button asChild className="w-full">
                <Link href="/legal/legal-mentions">Consulter</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Politique de confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comment nous collectons, utilisons et protégeons vos données
                personnelles selon le RGPD.
              </p>
              <Button asChild className="w-full">
                <Link href="/legal/legal-privacy">Consulter</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5" />
                Conditions générales d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Les règles et conditions régissant l'utilisation de notre
                service.
              </p>
              <Button asChild className="w-full">
                <Link href="/legal/legal-conditions">Consulter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-2 text-lg font-semibold">Besoin d'aide ?</h2>
              <p className="text-muted-foreground mb-4">
                Si vous avez des questions concernant nos politiques légales,
                n'hésitez pas à nous contacter.
              </p>
              <Button variant="outline" asChild>
                <Link href="mailto:contact@lapince.fr">Nous contacter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
