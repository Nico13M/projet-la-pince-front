import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { BellIcon } from 'lucide-react';
import { getUserNotifications, userNotification } from '@/app/_actions/user/notification';
import {
  ClockIcon,
  TriangleAlert ,
  AlertCircleIcon,
  CheckCircleIcon,
} from 'lucide-react'

export interface Notification {
  id: string
  message: string
  type: 'THRESHOLD_80' | 'THRESHOLD_100' | 'OVERFLOW'
  createdAt: string
  isRead: boolean
}

interface NotificationBellProps {
  notifications: Notification[]
  unreadCount: number
}

export function NotificationBell() {

const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function loadHistory() {
      try {
        const raw = await getUserNotifications()
         const data = raw.map(evt => {
       
        let message = 'Notification budget'
        if (evt.type === 'THRESHOLD_80')
          message = `Budget ${evt.data?.budgetName} à 80% utilisé (${evt.data.usedPercentage}%).`
        else if (evt.type === 'THRESHOLD_100')
          message = `Budget ${evt.data?.budgetName} atteint 100% (${evt.data.thresholdAmount} €).`
        else if (evt.type === 'OVERFLOW')
          message = `Budget ${evt.data?.budgetName} dépassé de ${evt.data.usedPercentage - 100}%.`

        return {
          id: evt.id,
          type: evt.type,
          message,
          createdAt: evt.createdAt,
          isRead: evt.isRead,
        } as Notification
      })

      setNotifications(data)
      setUnreadCount(data.filter(n => !n.isRead).length)
    } catch (err) {
      console.error('Impossible de charger les notifications :', err)
    }
}
    loadHistory()

    const userId = window.localStorage.getItem('userId');
   
    
    if (!userId) {
      console.error('Aucun userId trouvé dans localStorage');
      return;
    }
    
    
    const apiUrl = process.env.NEXT_PUBLIC_API_LINK;
    const sseUrl = `${apiUrl}/budgets/stream/${userId}`;

    const evtSource = new EventSource(sseUrl, { withCredentials: true });
    
    function handleEventData(data) {
      
      try {
        const evt = typeof data === 'string' ? JSON.parse(data) : data;
    
        let message = 'Notification budget';
        
        if (evt.type === 'THRESHOLD_80') {
          message = `Budget ${evt.data?.budgetName} à 80% utilisé (${evt.data?.usedPercentage || 0}%).`;
        } else if (evt.type === 'THRESHOLD_100') {
          message = `Budget ${evt.data?.budgetName} atteint 100% (${evt.data?.thresholdAmount || 0} €).`;
        } else if (evt.type === 'OVERFLOW') {
          message = `Budget ${evt.data?.budgetName} dépassé de ${(evt.data?.usedPercentage || 0) - 100}%.`;
        }

      
        const notification = {
          id: `${evt.budgetId}-${Date.now()}`,
          type: evt.type,
          message,
          createdAt: new Date().toISOString(),
          isRead: false,     
        };

        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(count => count + 1);
      } catch (err) {
        console.error('Erreur lors du traitement de l\'événement:', err, 'Données reçues:', typeof data === 'string' ? data : JSON.stringify(data));
      }
    }

    evtSource.onmessage = (e) => {
      
      try {
        handleEventData(e.data);
      } catch (err) {
        console.error('Erreur de parsing du message générique:', err, 'Données reçues:', e.data);
      }
    };

    ['THRESHOLD_80', 'THRESHOLD_100', 'OVERFLOW'].forEach((evtType) => {
      evtSource.addEventListener(evtType, (e) => {
        console.log(`Événement spécifique ${evtType} reçu:`, e);
        console.log(`Données de l'événement ${evtType}:`, e.data);
        handleEventData(e.data);
      });
    });

    evtSource.onopen = () => {
      console.log('Connexion SSE établie avec succès');
    };
    
    // evtSource.onerror = (err) => {
    //   console.error('Erreur de connexion SSE:', err);
    // };

    return () => {
      console.log('Fermeture de la connexion SSE');
      evtSource.close();
    };
  }, []);

   function handleMenuOpen(open: boolean) {
    if (!open) return
    markAllAsRead()
  }

  async function markAllAsRead() {
    try {
      await userNotification()
      setNotifications(notifs => notifs.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error(err)
    }
  }


  function IconFor(n: Notification) {
    if (n.type === 'THRESHOLD_80') return <TriangleAlert  className="h-4 w-4 text-yellow-500" />
    if (n.type === 'THRESHOLD_100')
      return <CheckCircleIcon className="h-4 w-4 text-green-500" />
    return <AlertCircleIcon className="h-4 w-4 text-red-500" />
  }

  return (
    <DropdownMenu onOpenChange={handleMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <BellIcon  className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs leading-none text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-80">
        <DropdownMenuGroup>
          {notifications.length === 0 && (
            <DropdownMenuItem disabled>Pas de notifications</DropdownMenuItem>
          )}
          {notifications.map(n => (
            <DropdownMenuItem
              key={n.id}
              className={`flex items-start space-x-2 p-2 rounded-md hover:bg-muted/30 ${
                !n.isRead ? 'bg-muted/50 font-medium' : ''
              }`}
            >
              {IconFor(n)}
              <div className="flex-1">
                <p>{n.message}</p>
                <time className="text-xs text-muted-foreground">
                  {new Date(n.createdAt).toLocaleString('fr-FR',{
                    dateStyle: 'medium',   
                    timeStyle: 'medium'    
                  })}
                </time>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {notifications.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuItem className="justify-center text-sm">Voir tout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}