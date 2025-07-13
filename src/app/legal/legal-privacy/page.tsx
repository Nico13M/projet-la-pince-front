import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  ArrowLeft,
  Database,
  Eye,
  Lock,
  Shield,
  UserCheck,
} from 'lucide-react'
import Link from 'next/link'

export default function LegalPrivacyPage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground mt-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La présente politique de confidentialité a pour but de vous
                informer sur la façon dont La Pince (« nous », « notre », « nos
                ») collecte, utilise et protège vos données personnelles lorsque
                vous utilisez notre application de gestion budgétaire.
              </p>
              <p className="text-muted-foreground">
                Cette politique s'applique à tous les utilisateurs de nos
                services et est conforme au Règlement général sur la protection
                des données (RGPD) et à la loi française sur la protection des
                données.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Données collectées
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Données d'identification</h3>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Mot de passe (crypté)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Données financières</h3>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>Informations sur vos budgets</li>
                  <li>Transactions financières</li>
                  <li>Catégories de dépenses</li>
                  <li>Objectifs financiers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Données techniques</h3>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Système d'exploitation</li>
                  <li>Pages visitées et temps de navigation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Finalités du traitement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Fourniture du service</h3>
                <p className="text-muted-foreground">
                  Permettre la création et la gestion de votre compte,
                  l'utilisation des fonctionnalités de gestion budgétaire, la
                  sauvegarde et la synchronisation de vos données.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Amélioration du service</h3>
                <p className="text-muted-foreground">
                  Analyser l'utilisation de l'application pour améliorer ses
                  performances et développer de nouvelles fonctionnalités.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Communication</h3>
                <p className="text-muted-foreground">
                  Vous envoyer des notifications importantes concernant votre
                  compte, des mises à jour de service et, avec votre
                  consentement, des informations marketing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Obligations légales</h3>
                <p className="text-muted-foreground">
                  Respecter nos obligations légales et réglementaires, notamment
                  en matière de lutte contre le blanchiment d'argent et le
                  financement du terrorisme.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Base légale du traitement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Exécution du contrat</h3>
                <p className="text-muted-foreground">
                  Le traitement de vos données personnelles est nécessaire à
                  l'exécution du contrat de service que vous avez conclu avec
                  nous.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Intérêt légitime</h3>
                <p className="text-muted-foreground">
                  Nous avons un intérêt légitime à traiter certaines données
                  pour améliorer nos services et assurer la sécurité de notre
                  plateforme.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Consentement</h3>
                <p className="text-muted-foreground">
                  Pour certains traitements, notamment l'envoi de communications
                  marketing, nous demandons votre consentement explicite.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Sécurité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre la perte, l'utilisation abusive, l'accès non
                autorisé, la divulgation, l'altération ou la destruction.
              </p>
              <div>
                <h3 className="font-semibold">Mesures techniques</h3>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>Chiffrement des données sensibles</li>
                  <li>Authentification à deux facteurs</li>
                  <li>Protocoles de communication sécurisés (HTTPS)</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Mesures organisationnelles</h3>
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
                  <li>Accès aux données limité aux personnes autorisées</li>
                  <li>Formation du personnel à la protection des données</li>
                  <li>Procédures de gestion des incidents de sécurité</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conservation des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous conservons vos données personnelles uniquement pendant la
                durée nécessaire aux finalités pour lesquelles elles ont été
                collectées :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>
                  Données de compte : pendant toute la durée d'utilisation du
                  service
                </li>
                <li>Données financières : 5 ans après la clôture du compte</li>
                <li>Données de connexion : 1 an maximum</li>
                <li>Données marketing : jusqu'au retrait du consentement</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>
                  <strong>Droit d'accès</strong> : obtenir la confirmation que
                  vos données sont traitées
                </li>
                <li>
                  <strong>Droit de rectification</strong> : corriger vos données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l'effacement</strong> : supprimer vos données
                  dans certains cas
                </li>
                <li>
                  <strong>Droit à la limitation</strong> : limiter le traitement
                  de vos données
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> : récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit d'opposition</strong> : vous opposer au
                  traitement de vos données
                </li>
                <li>
                  <strong>Droit de retrait du consentement</strong> : retirer
                  votre consentement
                </li>
              </ul>
              <p className="text-muted-foreground">
                Pour exercer ces droits, contactez-nous à :{' '}
                <strong>contact@lapince.fr</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partage des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous ne vendons, ne louons ni ne partageons vos données
                personnelles avec des tiers, sauf dans les cas suivants :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Avec votre consentement explicite</li>
                <li>Pour respecter une obligation légale</li>
                <li>Avec nos prestataires de services (sous contrat strict)</li>
                <li>En cas de fusion, acquisition ou vente d'actifs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Modifications de cette politique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous pouvons mettre à jour cette politique de confidentialité de
                temps à autre. Nous vous informerons de tout changement
                important par email ou par une notification dans l'application.
              </p>
              <p className="text-muted-foreground">
                Il est recommandé de consulter régulièrement cette page pour
                prendre connaissance des éventuelles modifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de
                confidentialité ou le traitement de vos données personnelles,
                vous pouvez nous contacter :
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1">
                <li>Email : contact@lapince.fr</li>
                <li>Adresse : 75 rue du Budget, 75001 Paris, France</li>
                <li>Téléphone : 06 06 06 06 06</li>
              </ul>
              <p className="text-muted-foreground">
                Vous avez également le droit de déposer une plainte auprès de la
                Commission nationale de l'informatique et des libertés (CNIL) si
                vous estimez que le traitement de vos données personnelles
                constitue une violation de la réglementation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
