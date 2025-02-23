import { formatCurrency } from '@/lib/formatters';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  priceInCents: number;
  description: string;
  id: string;
  imagePath: string;
}

export function ProductCard({
  name,
  priceInCents,
  description,
  id,
  imagePath,
}: ProductCardProps) {
  return (
    <Card>
      <div className='relative w-full h-auto aspect-video'>
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size='lg' className='w-full'>
          <Link href={`/products/${id}/purchase`}></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
