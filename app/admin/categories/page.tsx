import React from 'react'
import Categories from './components/Categories';
import getCategories from '@/app/action/getCategories';

async function page() {
  const getcategories = await getCategories()
  return (
    <div>
      <Categories categories={getcategories} />
    </div>
  );
}

export default page