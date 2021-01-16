## Components

I have implemented 3 types of components:
- Layouts: Components that define the positioning of its child/children components
- Wrappers: Components that enables special capabilities: onClick (maybe animations in the future?)
- The others: Components that serve only one function each: Buttons, Labels, Text. Have no knowledge about their positionings

These components uses inline styles, which may negatively impact performance on render. Consider refactor to use classes instead

Heavily inspired by Material UI components and Flutter widgets