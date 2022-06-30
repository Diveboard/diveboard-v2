import React, { FC } from 'react';
import { CopyProperty } from '../../Icons/IconSVGComponents/CopyProperty';
import { Delete } from '../../Icons/IconSVGComponents/Delete';
import { EditDive } from '../../Icons/IconSVGComponents/Editdive';
import { Export } from '../../Icons/IconSVGComponents/Export';
import { Paste } from '../../Icons/IconSVGComponents/Paste';
import { Print } from '../../Icons/IconSVGComponents/Print';
import { Unpublish } from '../../Icons/IconSVGComponents/Unpublish';
import pageRoutes from '../../../routes/pagesRoutes.json';

import { LogbookDropdownItem } from '../LogbookDropdown/DropdownItem';

import styles from './styles.module.scss';

const dropdownList = [
  {
    id: 1,
    title: 'Print',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <Print />,
  },
  {
    id: 2,
    title: 'Export',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <Export />,
  },
  {
    id: 3,
    title: 'Edit Dive',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <EditDive />,
  },
  {
    id: 4,
    title: 'Copy Property',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <CopyProperty />,
  },
  {
    id: 5,
    title: 'Paste properties',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <Paste />,
  },
  {
    id: 6,
    title: 'Unpublish',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <Unpublish />,
  },
  {
    id: 7,
    title: 'Delete',
    link: pageRoutes.diveManagerPageRout,
    svgItem: <Delete />,
  },
];

const dropdownElements = dropdownList.map((item) => (
  <LogbookDropdownItem key={item.id} title={item.title} link={item.link}>
    {item.svgItem}
  </LogbookDropdownItem>
));

const SetDropdown: FC = () => (
  <div
    // ref={dropdownRef}
    // onClick={(): void => {
    //   setOpen(!open);
    // }}
    className={styles.dropdown}
  >
    <div className={styles.itemsWrapper}>{dropdownElements}</div>
    {/* {open && <div className={styles.itemsWrapper}>{dropdownElements}</div>} */}
  </div>
);

export default SetDropdown;
