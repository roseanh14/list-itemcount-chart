import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ShoppingListDetails from '../shopping-list-detail/ShoppingListDetails';
import ShoppingListMembers from '../shopping-list-detail/ShoppingListMembers';
import ShoppingListItems from '../shopping-list-detail/ShoppingListItems';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

const ShoppingList = ({ shoppingList, onUpdate }) => {
  const [newMember, setNewMember] = useState('');
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [solvedItemsCount, setSolvedItemsCount] = useState(0);

  const { t } = useTranslation();

  const initialShoppingList = {
    id: 'some-id',
    name: t('groceries'),
    items: [
      { id: uuidv4(), text: t('flour'), checked: false },
      { id: uuidv4(), text: t('milk'), checked: false },
      { id: uuidv4(), text: t('egg'), checked: true },
      { id: uuidv4(), text: t('chocolate'), checked: true },
    ],
    owner: t('john'),
    members: [t('jane')],
  };

  useEffect(() => {
    const updateSolvedItemsCount = () => {
      const solvedCount = initialShoppingList.items.filter((item) => item.checked).length;
      setSolvedItemsCount(solvedCount);
    };

    updateSolvedItemsCount();
  }, [initialShoppingList.items]);

  const COLORS = ['#0088FE'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <ShoppingListDetails
        shoppingList={shoppingList}
        isOwner={isOwner}
        onUpdate={onUpdate}
        onSwitchRole={() => setIsOwner((prevIsOwner) => !prevIsOwner)}
      />
      <ShoppingListMembers
        shoppingList={shoppingList}
        isOwner={isOwner}
        newMember={newMember}
        onAddMember={(member) => {
          setNewMember('');
          onUpdate({ ...shoppingList, members: [...shoppingList.members, member] });
        }}
        onRemoveMember={(member) => {
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
        onUnsubscribe={(member) => {
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
      />
      {/* Pie Chart */}
      <div style={{ width: '50%', height: '300px', margin: '20px auto', position: 'relative', left: '17%' }}>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={[
              { name: t('solvedItems'), value: solvedItemsCount },
              { name: t('unsolvedItems'), value: initialShoppingList.items.length - solvedItemsCount },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {initialShoppingList.items.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[0]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <ShoppingListItems
        shoppingList={shoppingList}
        showUncheckedOnly={showUncheckedOnly}
        onUpdate={onUpdate}
        onToggleShowUncheckedOnly={() => setShowUncheckedOnly(!showUncheckedOnly)}
      />
    </div>
  );
};

export default ShoppingList;