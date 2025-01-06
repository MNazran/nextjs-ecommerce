'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/formatters';
import { useState } from 'react';
import { addProduct } from '../../_actions/products';

export function ProductForm() {
  const [priceInCents, setPriceInCents] = useState<number | string>('');

  return (
    <form action={addProduct} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name' name='name' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='priceInCents'>Price In Cents</Label>
        <Input
          type='number'
          id='priceInCents'
          name='priceInCents'
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(e.target.value)}
        />
        <div className='text-muted-foreground'>
          {formatCurrency((Number(priceInCents) || 0) / 100)}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='desc'>Description</Label>
          <Textarea id='description' name='description' required />
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='name'>File</Label>
        <Input type='file' id='file' name='file' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input type='file' id='image' name='image' required />
      </div>
      <Button type='submit'>Save</Button>
    </form>
  );
}