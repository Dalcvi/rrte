import React from 'react';
import {
  DropdownConfig,
  RegularButtonConfig,
  SingleToolbarItem,
  ToolbarItemType,
} from '../toolbar.types';
import {
  getConfigsMapByName,
  getDifferentToolbarTypes,
  getReducedMutliExtensions,
  reduceMultiExtensionValuesIntoOne,
  sortByPriority,
} from '../toolbar.utils';

describe('toolbar utils', () => {
  describe('getDifferentToolbarTypes', () => {
    it('should group items by toolbar type', () => {
      const items: (RegularButtonConfig<any> | DropdownConfig)[] = [
        {
          name: 'regular-button-1',
          type: 'icon' as const,
          priority: 1,
          text: 'regular-button-1',
          Icon: () => <div data-testid="regular-button-1"></div>,
          onClick: () => {},
          getIsActive: () => false,
          getIsDisabled: () => false,
          iconStyling: 'fill',
          group: {
            name: 'group-1',
            text: 'group-1',
            priority: 7,
            toolbar: 'main',
          },
        },
        {
          name: 'dropdown-1',
          type: 'dropdown' as const,
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 1,
          values: [],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
        {
          name: 'regular-button-2',
          type: 'icon' as const,
          priority: 1,
          text: 'regular-button-2',
          Icon: () => <div data-testid="regular-button-2"></div>,
          onClick: () => {},
          getIsActive: () => false,
          getIsDisabled: () => false,
          iconStyling: 'fill',
          group: {
            name: 'group-1',
            text: 'group-1',
            priority: 7,
            toolbar: 'main',
          },
        },
        {
          name: 'dropdown-2',
          type: 'dropdown' as const,
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 1,
          values: [],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
      ];

      const result = getDifferentToolbarTypes(items);

      expect(result[ToolbarItemType.ICON]).toEqual([
        {
          name: 'regular-button-1',
          type: 'icon',
          priority: 1,
          text: 'regular-button-1',
          Icon: expect.any(Function),
          onClick: expect.any(Function),
          getIsActive: expect.any(Function),
          getIsDisabled: expect.any(Function),
          iconStyling: 'fill',
          group: {
            name: 'group-1',
            text: 'group-1',
            priority: 7,
            toolbar: 'main',
          },
        },
        {
          name: 'regular-button-2',
          type: 'icon',
          priority: 1,
          text: 'regular-button-2',
          Icon: expect.any(Function),
          onClick: expect.any(Function),
          getIsActive: expect.any(Function),
          getIsDisabled: expect.any(Function),
          iconStyling: 'fill',
          group: {
            name: 'group-1',
            text: 'group-1',
            priority: 7,
            toolbar: 'main',
          },
        },
      ]);

      expect(result[ToolbarItemType.DROPDOWN]).toEqual([
        {
          name: 'dropdown-1',
          type: 'dropdown',
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 1,
          values: [],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
        {
          name: 'dropdown-2',
          type: 'dropdown',
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 1,
          values: [],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
      ]);
    });

    it('should return empty arrays for missing toolbar types', () => {
      const items: any[] = [];

      const result = getDifferentToolbarTypes(items);

      expect(result[ToolbarItemType.ICON]).toEqual([]);
      expect(result[ToolbarItemType.DROPDOWN]).toEqual([]);
      expect(result[ToolbarItemType.INPUT_ICON]).toEqual([]);
      expect(result[ToolbarItemType.CUSTOM_LOGIC]).toEqual([]);
      expect(result[ToolbarItemType.COLOR_SELECTION]).toEqual([]);
      expect(result[ToolbarItemType.MODAL]).toEqual([]);
      expect(result[ToolbarItemType.NUMBER_CONTROL]).toEqual([]);
    });
  });

  describe('getConfigsMapByName', () => {
    it('should correctly create a config map', () => {
      const toolbarInfos = [
        {
          toolbar: {
            name: 'dropdown-1',
            type: 'dropdown' as const,
            priority: 2,
            text: 'dropdown',
            dropdownName: 'dropdown',
            DropdownPriority: 1,
            values: [],
            group: {
              name: 'group-2',
              text: 'group-2',
              priority: 6,
              toolbar: 'main',
            },
          },
          config: { someConfig: 'value' },
        },
        {
          toolbar: {
            name: 'regular-button-2',
            type: 'icon' as const,
            priority: 1,
            text: 'regular-button-2',
            Icon: () => <div data-testid="regular-button-2"></div>,
            onClick: () => {},
            getIsActive: () => false,
            getIsDisabled: () => false,
            iconStyling: 'fill',
            group: {
              name: 'group-1',
              text: 'group-1',
              priority: 7,
              toolbar: 'main',
            },
          },
          config: { anotherConfig: 'value2' },
        },
      ] as {
        toolbar: SingleToolbarItem<any>;
        config: Record<string, any>;
      }[];

      const expectedOutput = {
        'dropdown-1': { someConfig: 'value' },
        'regular-button-2': { anotherConfig: 'value2' },
      };

      const result = getConfigsMapByName(toolbarInfos);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe('sortByPriority', () => {
    test('should sort items in descending order based on priority', () => {
      const items = [
        { name: 'Item1', priority: 3 },
        { name: 'Item2', priority: 1 },
        { name: 'Item3', priority: 2 },
      ];

      const sortedItems = sortByPriority(items);

      expect(sortedItems).toEqual([
        { name: 'Item1', priority: 3 },
        { name: 'Item3', priority: 2 },
        { name: 'Item2', priority: 1 },
      ]);
    });

    test('should return the same array if items have the same priority', () => {
      const items = [
        { name: 'Item1', priority: 1 },
        { name: 'Item2', priority: 1 },
        { name: 'Item3', priority: 1 },
      ];

      const sortedItems = sortByPriority(items);

      expect(sortedItems).toEqual(items);
    });

    test('should handle an empty array', () => {
      const items: any[] = [];

      const sortedItems = sortByPriority(items);

      expect(sortedItems).toEqual([]);
    });
  });

  describe('reduceMultiExtensionValuesIntoOne', () => {
    test('should reduce multiple extension values into one with the biggest priority', () => {
      const items: DropdownConfig[] = [
        {
          name: 'dropdown-1',
          type: 'dropdown' as const,
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 2,
          values: [
            {
              name: 'item-1',
              text: 'item-1',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
            {
              name: 'item-2',
              text: 'item-2',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
          ],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
        {
          name: 'dropdown-2',
          type: 'dropdown' as const,
          priority: 1,
          text: 'dropdown-2',
          dropdownName: 'dropdown',
          DropdownPriority: 1,
          values: [
            {
              name: 'item-3',
              text: 'item-3',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
            {
              name: 'item-4',
              text: 'item-4',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
          ],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        },
      ];

      const reducedDropdown = reduceMultiExtensionValuesIntoOne(items);

      expect(JSON.stringify(reducedDropdown)).toEqual(
        JSON.stringify({
          name: 'dropdown-1',
          type: 'dropdown' as const,
          priority: 2,
          text: 'dropdown',
          dropdownName: 'dropdown',
          DropdownPriority: 2,
          values: [
            {
              name: 'item-1',
              text: 'item-1',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
            {
              name: 'item-2',
              text: 'item-2',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
            {
              name: 'item-3',
              text: 'item-3',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
            {
              name: 'item-4',
              text: 'item-4',
              belongsTo: 'dropdown',
              isActive: () => false,
              onClick: () => {},
              getIsDisabled: () => false,
              priority: 2,
            },
          ],
          group: {
            name: 'group-2',
            text: 'group-2',
            priority: 6,
            toolbar: 'main',
          },
        })
      );
    });

    test('should handle an empty array', () => {
      const items: DropdownConfig[] = [];

      const reducedDropdown = reduceMultiExtensionValuesIntoOne(items);

      expect(reducedDropdown).toEqual(undefined);
    });
  });

  describe('getReducedMutliExtensions', () => {
    const dropdown1: DropdownConfig = {
      name: 'dropdown-1',
      type: 'dropdown' as const,
      priority: 2,
      text: 'dropdown',
      dropdownName: 'dropdown-2',
      DropdownPriority: 1,
      group: {
        name: 'group-2',
        text: 'group-2',
        priority: 6,
        toolbar: 'main',
      },
      values: [
        {
          name: 'item-1',
          text: 'item-1',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
        {
          name: 'item-2',
          text: 'item-2',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    const dropdown2: DropdownConfig = {
      name: 'dropdown-2',
      type: 'dropdown' as const,
      priority: 2,
      text: 'dropdown',
      dropdownName: 'dropdown',
      DropdownPriority: 1,
      group: {
        name: 'group-2',
        text: 'group-2',
        priority: 6,
        toolbar: 'main',
      },
      values: [
        {
          name: 'item-3',
          text: 'item-3',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
        {
          name: 'item-4',
          text: 'item-4',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    const dropdown3: DropdownConfig = {
      name: 'dropdown-3',
      type: 'dropdown' as const,
      priority: 2,
      text: 'dropdown',
      dropdownName: 'dropdown-2',
      DropdownPriority: 1,
      group: {
        name: 'group-2',
        text: 'group-2',
        priority: 6,
        toolbar: 'main',
      },
      values: [
        {
          name: 'item-5',
          text: 'item-5',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
        {
          name: 'item-6',
          text: 'item-6',
          belongsTo: 'dropdown',
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    const items: DropdownConfig[] = [dropdown1, dropdown2, dropdown3];

    it('should reduce multiple extensions with the same name into one', () => {
      const reducedExtensions = getReducedMutliExtensions(items);
      expect(reducedExtensions).toHaveLength(2);
      expect(reducedExtensions[0]).toEqual(
        reduceMultiExtensionValuesIntoOne([dropdown1, dropdown3])
      );
      expect(reducedExtensions[1]).toEqual(dropdown2);
    });
  });
});
