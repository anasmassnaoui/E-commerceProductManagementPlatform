'use client';

import { Sidebar as FLSidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag } from 'react-icons/hi';

export function Sidebar() {
  return (
    <FLSidebar className="fixed top-0 left-0 z-40 max-sm:hidden">
      <FLSidebar.Items>
        <FLSidebar.ItemGroup>
          <FLSidebar.Item href="/home" icon={HiChartPie}>
            Dashboard
          </FLSidebar.Item>
          <FLSidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <FLSidebar.Item href="/products">Products</FLSidebar.Item>
          </FLSidebar.Collapse>
        </FLSidebar.ItemGroup>
      </FLSidebar.Items>
    </FLSidebar>
  );
}
