import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export default function LegalMentionsPage() {
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
            Mentions légales
          </h1>
          <p className="text-muted-foreground mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Raison sociale</h3>
                <p className="text-muted-foreground">La Pince</p>
              </div>
              <div>
                <h3 className="font-semibold">Forme juridique</h3>
                <p className="text-muted-foreground">
                  Société par actions simplifiée (SAS)
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Capital social</h3>
                <p className="text-muted-foreground">10 000 €</p>
              </div>
              <div>
                <h3 className="font-semibold">Siège social</h3>
                <p className="text-muted-foreground">
                  75 rue du Budget, 75001 Paris, France
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Numéro SIRET</h3>
                <p className="text-muted-foreground">123 456 789 00012</p>
              </div>
              <div>
                <h3 className="font-semibold">Code APE</h3>
                <p className="text-muted-foreground">
                  6201Z - Programmation informatique
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Numéro de TVA intracommunautaire
                </h3>
                <p className="text-muted-foreground">FR12345678901</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Directeur de la publication</h3>
                <p className="text-muted-foreground">Marc Dubois</p>
              </div>
              <div>
                <h3 className="font-semibold">Contact</h3>
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@lapince.fr</span>
                </div>
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>06 06 06 06 06</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Hébergeur</h3>
                <p className="text-muted-foreground">Vercel Inc.</p>
              </div>
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble du site La Pince, y compris tous les textes, images,
                sons, logiciels, et tout autre matériel, est protégé par le
                droit de la propriété intellectuelle et appartient à La Pince ou
                à ses concédants de licence.
              </p>
              <p className="text-muted-foreground">
                Toute reproduction, distribution, modification, adaptation,
                retransmission ou publication de ces différents éléments est
                strictement interdite sans l'accord écrit préalable de La Pince.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La Pince s'efforce de fournir des informations exactes et à jour
                sur son site web. Cependant, elle ne peut garantir l'exactitude,
                la précision ou l'exhaustivité des informations mises à
                disposition.
              </p>
              <p className="text-muted-foreground">
                En conséquence, La Pince décline toute responsabilité pour toute
                imprécision, inexactitude ou omission portant sur des
                informations disponibles sur le site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Droit applicable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige et à défaut de résolution amiable, les
                tribunaux français seront seuls compétents.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
