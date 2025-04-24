import { toast as sonnerToast } from 'sonner'

export function useToast() {
  const showToast = ({
    title,
    description,
    variant = 'default',
  }: {
    title: string
    description?: string
    variant?: 'default' | 'destructive' | 'success'
  }) => {
    if (variant === 'destructive') {
      sonnerToast.error(title, {
        description: description,
      })
    } else if (variant === 'success') {
      sonnerToast.success(title, {
        description: description,
      })
    } else {
      sonnerToast(title, {
        description: description,
      })
    }
  }

  return { showToast }
}
