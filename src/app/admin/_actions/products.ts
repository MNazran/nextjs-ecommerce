'use server';

import db from '@/db/db';
import { z } from 'zod';
import fs from 'fs/promises';
import { redirect } from 'next/navigation';

// const fileSchema = z.object({
//   name: z.string().nonempty({ message: 'Required' }),
//   size: z.number().min(1, { message: 'File is required' }),
//   type: z.string().nonempty(),
// });
const fileSchema = z.instanceof(File, { message: 'Required' });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/')
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, 'Required'),
  image: imageSchema.refine((file) => file.size > 0, 'Required'),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  await fs.mkdir('products', { recursive: true });
  //create a file path for the product
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`; //having random ID to avoid conflicts
  //save the file to the file path
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir('public/products', { recursive: true });
  //create an image path for the product
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  //save the image to the image path in public folder
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });
  redirect('/admin/products');
}
