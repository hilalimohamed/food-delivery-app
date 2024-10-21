import React from 'react'
import Categories from './components/Categories';
import getCategories from '@/app/action/getCategories';

async function page() {
  const categories = await getCategories()
  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
}

export default page