import {
  DropdownConfig,
  RegularButtonConfig,
  SingleToolbarItem,
  ToolbarItem,
  ToolbarItemType,
} from '../toolbar.types';
import {
  getConfigsMapByName,
  getDifferentToolbarTypes,
  getReducedMutliExtensions,
  reduceMultiExtensionValuesIntoOne,
  sortByPriority,
  spreadToolbarItems,
} from '../toolbar.utils';

const mockButton = (name: string, priority: number) => ({
  name,
  type: ToolbarItemType.ICON,
  text: name,
  Button: () => <div>{name}</div>, // This is a mock, replace with actual component if needed
  priority,
});

const mockDropdown = (name: string, priority: number) => ({
  name,
  type: ToolbarItemType.DROPDOWN,
  text: name,
  DropdownPriority: priority,
  priority,
  values: [
    {
      name: `${name}-value`,
      text: `${name}-value`,
      isActive: () => true,
      onClick: () => {},
      priority,
    },
  ],
});

describe('toolbar utils', () => {
  describe('spreadToolbarItems', () => {
    it('should spread array items into single items', () => {
      const input = [
        mockButton('Button1', 1),
        [mockDropdown('Dropdown1', 1), mockButton('Button2', 2)],
        mockDropdown('Dropdown2', 2),
      ];

      const expectedOutput = [
        mockButton('Button1', 1),
        mockDropdown('Dropdown1', 1),
        mockButton('Button2', 2),
        mockDropdown('Dropdown2', 2),
      ];

      expect(JSON.stringify(spreadToolbarItems(input))).toEqual(JSON.stringify(expectedOutput));
    });

    it('should return an empty array when the input is empty', () => {
      const input = [] as ToolbarItem<any>[];
      const expectedOutput = [] as SingleToolbarItem<any>[];

      expect(JSON.stringify(spreadToolbarItems(input))).toEqual(JSON.stringify(expectedOutput));
    });
  });

  describe('getDifferentToolbarTypes', () => {
    it('should group items by toolbar type', () => {
      const items: (RegularButtonConfig<any> | DropdownConfig)[] = [
        {
          name: 'Button1',
          type: ToolbarItemType.ICON,
          text: 'Button1',
          Button: () => null as any,
          priority: 1,
        },
        {
          name: 'Dropdown1',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown1',
          DropdownPriority: 1,
          priority: 1,
          values: [],
        },
        {
          name: 'Button2',
          type: ToolbarItemType.ICON,
          text: 'Button2',
          Button: () => null as any,
          priority: 2,
        },
        {
          name: 'Dropdown2',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown2',
          DropdownPriority: 2,
          priority: 2,
          values: [],
        },
      ];

      const result = getDifferentToolbarTypes(items);

      expect(result[ToolbarItemType.ICON]).toEqual([
        {
          name: 'Button1',
          type: ToolbarItemType.ICON,
          text: 'Button1',
          Button: expect.any(Function),
          priority: 1,
        },
        {
          name: 'Button2',
          type: ToolbarItemType.ICON,
          text: 'Button2',
          Button: expect.any(Function),
          priority: 2,
        },
      ]);

      expect(result[ToolbarItemType.DROPDOWN]).toEqual([
        {
          name: 'Dropdown1',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown1',
          DropdownPriority: 1,
          priority: 1,
          values: [],
        },
        {
          name: 'Dropdown2',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown2',
          DropdownPriority: 2,
          priority: 2,
          values: [],
        },
      ]);
    });

    it('should return empty arrays for missing toolbar types', () => {
      const items: (RegularButtonConfig<any> | DropdownConfig)[] = [];

      const result = getDifferentToolbarTypes(items);

      expect(result[ToolbarItemType.ICON]).toEqual([]);
      expect(result[ToolbarItemType.DROPDOWN]).toEqual([]);
    });
  });

  describe('getConfigsMapByName', () => {
    it('should correctly create a config map', () => {
      const toolbarInfos = [
        {
          toolbar: [
            {
              name: 'item1',
              type: ToolbarItemType.ICON,
              text: 'Item 1',
              Button: () => null,
              priority: 1,
            },
            {
              name: 'item2',
              type: ToolbarItemType.DROPDOWN,
              text: 'Item 2',
              DropdownPriority: 1,
              priority: 2,
              values: [],
            },
          ],
          config: { someConfig: 'value' },
        },
        {
          toolbar: {
            name: 'item3',
            type: ToolbarItemType.ICON,
            text: 'Item 3',
            Button: () => null,
            priority: 3,
          },
          config: { anotherConfig: 'value2' },
        },
      ] as {
        toolbar: ToolbarItem<any>;
        config: Record<string, any>;
      }[];

      const expectedOutput = {
        item1: { someConfig: 'value' },
        item2: { someConfig: 'value' },
        item3: { anotherConfig: 'value2' },
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
      const items = [
        {
          name: 'Dropdown1',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown 1',
          DropdownPriority: 2,
          priority: 1,
          values: [
            {
              name: 'Value1',
              text: 'Value 1',
              isActive: () => true,
              onClick: () => {},
              priority: 1,
            },
            {
              name: 'Value2',
              text: 'Value 2',
              isActive: () => true,
              onClick: () => {},
              priority: 2,
            },
          ],
        },
        {
          name: 'Dropdown2',
          type: ToolbarItemType.DROPDOWN,
          text: 'Dropdown 2',
          DropdownPriority: 1,
          priority: 2,
          values: [
            {
              name: 'Value3',
              text: 'Value 3',
              isActive: () => true,
              onClick: () => {},
              priority: 3,
            },
            {
              name: 'Value4',
              text: 'Value 4',
              isActive: () => true,
              onClick: () => {},
              priority: 2,
            },
          ],
        },
      ];

      const reducedDropdown = reduceMultiExtensionValuesIntoOne(items);

      expect(reducedDropdown).toEqual({
        name: 'Dropdown1',
        type: ToolbarItemType.DROPDOWN,
        text: 'Dropdown 1',
        DropdownPriority: 2,
        priority: 1,
        values: [
          {
            name: 'Value1',
            text: 'Value 1',
            isActive: expect.any(Function),
            onClick: expect.any(Function),
            priority: 1,
          },
          {
            name: 'Value2',
            text: 'Value 2',
            isActive: expect.any(Function),
            onClick: expect.any(Function),
            priority: 2,
          },
          {
            name: 'Value3',
            text: 'Value 3',
            isActive: expect.any(Function),
            onClick: expect.any(Function),
            priority: 3,
          },
          {
            name: 'Value4',
            text: 'Value 4',
            isActive: expect.any(Function),
            onClick: expect.any(Function),
            priority: 2,
          },
        ],
      });
    });

    test('should handle an empty array', () => {
      const items: DropdownConfig[] = [];

      const reducedDropdown = reduceMultiExtensionValuesIntoOne(items);

      expect(reducedDropdown).toEqual(undefined);
    });
  });

  describe('getReducedMutliExtensions', () => {
    const dropdown1: DropdownConfig = {
      name: 'Dropdown1',
      type: 'dropdown',
      text: 'Dropdown1',
      DropdownPriority: 1,
      priority: 1,
      values: [
        {
          name: 'Value1',
          text: 'Value 1',
          isActive: () => true,
          onClick: () => {},
          priority: 1,
        },
        {
          name: 'Value2',
          text: 'Value 2',
          isActive: () => false,
          onClick: () => {},
          priority: 2,
        },
      ],
    };

    const dropdown2: DropdownConfig = {
      name: 'Dropdown2',
      type: 'dropdown',
      text: 'Dropdown2',
      DropdownPriority: 2,
      priority: 2,
      values: [
        {
          name: 'Value3',
          text: 'Value 3',
          isActive: () => true,
          onClick: () => {},
          priority: 1,
        },
        {
          name: 'Value4',
          text: 'Value 4',
          isActive: () => true,
          onClick: () => {},
          priority: 2,
        },
      ],
    };

    const dropdown3: DropdownConfig = {
      name: 'Dropdown1',
      type: 'dropdown',
      text: 'Dropdown1',
      DropdownPriority: 3,
      priority: 3,
      values: [
        {
          name: 'Value5',
          text: 'Value 5',
          isActive: () => true,
          onClick: () => {},
          priority: 1,
        },
        {
          name: 'Value6',
          text: 'Value 6',
          isActive: () => true,
          onClick: () => {},
          priority: 2,
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
