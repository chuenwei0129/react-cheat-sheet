import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <Link href="/demo1" className={buttonVariants({ variant: 'link' })}>
        demo1
      </Link>
      <Button asChild>
        <Link href="/demo2">demo2</Link>
      </Button>
      <Link href="/demo3">demo3</Link>
    </div>
  )
}
