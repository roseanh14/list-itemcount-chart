import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const ShoppingListItems = ({ shoppingList, showUncheckedOnly, onUpdate, onToggleShowUncheckedOnly }) => {
  const [newItemText, setNewItemText] = useState('');
  const { t } = useTranslation();

  // Initialize list with 2 checked items and 2 unchecked items
  const initialList = {
    items: [
      { id: uuidv4(), text: 'Flour', checked: false },
      { id: uuidv4(), text: 'Milk', checked: false },
      { id: uuidv4(), text: 'Egg', checked: true },
      { id: uuidv4(), text: 'Chocolate', checked: true },
    ],
  };

  // Since 'setList' is not being used, it can be removed
  const [list] = useState(initialList);

  const handleAddItem = () => {
    if (!newItemText) return;

    const updatedList = {
      ...list,
      items: [...list.items, { id: uuidv4(), text: newItemText, checked: false }],
    };

    onUpdate(updatedList);
    setNewItemText('');
  };

  const handleRemoveItem = (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.filter((item) => item.id !== itemId),
    };

    onUpdate(updatedList);
  };

  const handleToggleChecked = (itemId) => {
    const updatedList = {
      ...list,
      items: list.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };

    onUpdate(updatedList);
  };

  return (
    <div>
      <ul>
        {showUncheckedOnly
          ? list.items
              .filter((item) => !item.checked)
              .map((item) => (
                <li key={item.id}>
                  {item.text}
                  <button onClick={() => handleToggleChecked(item.id)}>
                    {item.checked ? t('uncheck') : t('check')}
                  </button>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    {t('remove')}
                  </button>
                </li>
              ))
          : list.items.map((item) => (
              <li key={item.id}>
                {item.text}
                <button onClick={() => handleToggleChecked(item.id)}>
                  {item.checked ? t('uncheck') : t('check')}
                </button>
                <button onClick={() => handleRemoveItem(item.id)}>
                  {t('remove')}
                </button>
              </li>
            ))}
      </ul>
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <button onClick={handleAddItem}>{t('addItem')}</button>
      <button onClick={onToggleShowUncheckedOnly}>
        {showUncheckedOnly ? t('showAllItems') : t('showUncheckedItemsOnly')}
      </button>
    </div>
  );
};

export default ShoppingListItems;