import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertCircle,
  ArrowLeft,
  Ban,
  CreditCard,
  FileText,
  Shield,
  Users,
} from 'lucide-react'
import Link from 'next/link'

export default function LegalConditionsPage() {
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
            Conditions générales d'utilisation
          </h1>
          <p className="text-muted-foreground mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Objet et champ d'application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes conditions générales d'utilisation (« CGU ») ont
                pour objet de définir les modalités et conditions d'utilisation
                de l'application La Pince, service de gestion budgétaire proposé
                par La Pince (« nous », « notre », « nos »).
              </p>
              <p className="text-muted-foreground">
                L'utilisation de l'application implique l'acceptation pleine et
                entière des présentes conditions générales d'utilisation par
                l'utilisateur.
              </p>
              <p className="text-muted-foreground">
                Ces conditions s'appliquent à tous les utilisateurs du service,
                qu'ils soient utilisateurs gratuits ou payants.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Définitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">« Service »</h3>
                <p className="text-muted-foreground">
                  Désigne l'application La Pince et l'ensemble des
                  fonctionnalités de gestion budgétaire proposées.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">« Utilisateur »</h3>
                <p className="text-muted-foreground">
                  Désigne toute personne physique ou morale qui utilise le
                  Service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">« Compte »</h3>
                <p className="text-muted-foreground">
                  Désigne l'espace personnel de l'Utilisateur sur l'application.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">« Données »</h3>
                <p className="text-muted-foreground">
                  Désigne toutes les informations saisies par l'Utilisateur dans
                  l'application.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Inscription et création de compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Conditions d'inscription</h3>
                <p className="text-muted-foreground">
                  L'inscription est ouverte à toute personne physique majeure ou
                  mineure avec autorisation parentale, et à toute personne
                  morale. L'Utilisateur garantit la véracité des informations
                  fournies lors de l'inscription.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Activation du compte</h3>
                <p className="text-muted-foreground">
                  L'inscription est gratuite et se fait en ligne. L'Utilisateur
                  doit fournir une adresse email valide et choisir un mot de
                  passe sécurisé.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Responsabilité du compte</h3>
                <p className="text-muted-foreground">
                  L'Utilisateur est seul responsable de la confidentialité de
                  ses identifiants et de toutes les activités effectuées sur son
                  compte.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description du service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La Pince propose un service de gestion budgétaire permettant aux
                utilisateurs de :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Créer et gérer des budgets personnalisés</li>
                <li>Suivre leurs dépenses et revenus</li>
                <li>Catégoriser leurs transactions</li>
                <li>Visualiser leurs données financières</li>
                <li>Définir des objectifs financiers</li>
                <li>Recevoir des notifications et alertes</li>
              </ul>
              <p className="text-muted-foreground">
                Le service est accessible via une application web et
                éventuellement des applications mobiles sur différentes
                plateformes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Obligations de l'utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Usage conforme</h3>
                <p className="text-muted-foreground">
                  L'Utilisateur s'engage à utiliser le Service conformément à sa
                  destination et dans le respect des présentes CGU.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Interdictions</h3>
                <p className="text-muted-foreground">
                  Il est formellement interdit de :
                </p>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>
                    Utiliser le Service à des fins illégales ou frauduleuses
                  </li>
                  <li>Tenter de compromettre la sécurité du Service</li>
                  <li>Partager ses identifiants de connexion</li>
                  <li>Utiliser des robots ou scripts automatisés</li>
                  <li>Perturber le fonctionnement du Service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Exactitude des données</h3>
                <p className="text-muted-foreground">
                  L'Utilisateur s'engage à fournir des informations exactes et à
                  les maintenir à jour. Il est seul responsable de la véracité
                  des données qu'il saisit.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nos engagements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Disponibilité du service</h3>
                <p className="text-muted-foreground">
                  Nous nous efforçons de maintenir le Service accessible 24h/24
                  et 7j/7. Toutefois, nous ne pouvons garantir une disponibilité
                  absolue et nous réservons le droit d'interrompre le Service
                  pour maintenance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Sécurité des données</h3>
                <p className="text-muted-foreground">
                  Nous mettons en place les mesures techniques et
                  organisationnelles nécessaires pour assurer la sécurité de vos
                  données personnelles et financières.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Support client</h3>
                <p className="text-muted-foreground">
                  Un service de support est disponible pour répondre à vos
                  questions via l'adresse email contact@lapince.fr.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Tarification et paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Offre gratuite</h3>
                <p className="text-muted-foreground">
                  Une version gratuite du Service est proposée avec des
                  fonctionnalités limitées.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Offres payantes</h3>
                <p className="text-muted-foreground">
                  Des offres payantes sont disponibles pour accéder à des
                  fonctionnalités avancées. Les tarifs sont indiqués sur notre
                  site web et peuvent être modifiés avec un préavis de 30 jours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Modalités de paiement</h3>
                <p className="text-muted-foreground">
                  Les paiements s'effectuent par carte bancaire ou autres moyens
                  de paiement acceptés. Les abonnements sont renouvelés
                  automatiquement sauf résiliation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Droit de rétractation</h3>
                <p className="text-muted-foreground">
                  Conformément à la législation en vigueur, vous disposez d'un
                  droit de rétractation de 14 jours pour les services payants.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le Service, son contenu, ses fonctionnalités et tous les
                éléments qui le composent sont la propriété exclusive de La
                Pince et sont protégés par les lois sur la propriété
                intellectuelle.
              </p>
              <p className="text-muted-foreground">
                L'Utilisateur dispose d'un droit d'utilisation personnel,
                non-exclusif et non-transmissible du Service. Toute
                reproduction, modification, distribution ou exploitation
                commerciale est interdite sans autorisation préalable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le traitement des données personnelles est régi par notre
                politique de confidentialité, qui fait partie intégrante des
                présentes CGU.
              </p>
              <p className="text-muted-foreground">
                En utilisant le Service, l'Utilisateur consent au traitement de
                ses données personnelles conformément à ladite politique.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Notre responsabilité est limitée aux dommages directs et
                prévisibles. Nous ne saurions être tenus responsables :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Des décisions financières prises par l'Utilisateur</li>
                <li>De la perte de données due à un cas de force majeure</li>
                <li>Des dommages indirects ou imprévisibles</li>
                <li>De l'utilisation non-conforme du Service</li>
              </ul>
              <p className="text-muted-foreground">
                L'Utilisateur est seul responsable de ses décisions financières
                et de l'exactitude des données qu'il saisit dans l'application.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ban className="mr-2 h-5 w-5" />
                Résiliation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Résiliation par l'Utilisateur</h3>
                <p className="text-muted-foreground">
                  L'Utilisateur peut résilier son compte à tout moment en nous
                  contactant ou directement depuis l'application. Les données
                  seront supprimées conformément à notre politique de
                  confidentialité.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Résiliation par La Pince</h3>
                <p className="text-muted-foreground">
                  Nous nous réservons le droit de suspendre ou résilier un
                  compte en cas de violation des présentes CGU, après mise en
                  demeure restée sans effet.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Effets de la résiliation</h3>
                <p className="text-muted-foreground">
                  La résiliation entraîne la suppression définitive du compte et
                  des données associées, sous réserve des obligations légales de
                  conservation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Modification des CGU
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier les présentes CGU à
                tout moment. Les modifications seront notifiées aux utilisateurs
                par email ou notification dans l'application.
              </p>
              <p className="text-muted-foreground">
                Les nouvelles CGU entrent en vigueur 30 jours après
                notification. L'utilisation continue du Service après cette date
                vaut acceptation des nouvelles conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Droit applicable et juridiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes CGU sont soumises au droit français. En cas de
                litige, et après tentative de résolution amiable, les tribunaux
                français seront seuls compétents.
              </p>
              <p className="text-muted-foreground">
                Pour toute question ou réclamation concernant le Service, vous
                pouvez nous contacter à l'adresse email : contact@lapince.fr.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pour toute question relative aux présentes conditions générales
                d'utilisation, vous pouvez nous contacter :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Email : contact@lapince.fr</li>
                <li>Adresse : 75 rue du Budget, 75001 Paris, France</li>
                <li>Téléphone : 06 06 06 06 06</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
