# Select Dropdown Component

A custom-built recursive dropdown component built with React, mimicking a resource selector with nested options, categorized grouping, breadcrumb navigation, dynamic option creation, and structured search formatting.

---

## ✨ Key Features

### 🔁 Recursive Dropdown with Categorized Options

- Options are defined in a tree structure with two node types:
  - `OPTION`: Represents selectable items
  - `CATEGORY`: Logical grouping within options
- Categories allow visual and logical grouping of child options within each parent node.

### 🧭 Breadcrumb Navigation

- Selected options are tracked and displayed as a breadcrumb trail.
- Clicking any breadcrumb level moves the context back to that node in the tree.

### ➕ Add New Resource

- Users can create new resources from within a modal.
- A radio list of categories under the current node allows the user to choose the category to place the new option in.
- Basic validation ensures a valid name and selected category before submission.

### 🔍 Smart Search Input

- Input box formats path as `!{AllResources.Account}` with contextual dot (`.`) appended for incomplete paths.
- User can search options within the context of current selection.
- Filters are based on current selection and intelligently scoped using `optionMap`.
- Handles malformed inputs gracefully.

---

## 🗂️ Project Structure

- Component-based modular architecture.
- State managed using `useReducer`.
- Utility files handle:
  - Mapping option trees
  - Filtering categories
  - Updating state tree immutably

```js
Node Example:
{
  id: string,
  name: string,
  value: string,
  type: 'OPTION' | 'CATEGORY',
  icon?: string,
  categoryId?: string,
  options?: OptionNode[]
}
```

---

## 📦 Installation & Running

```bash
npm install
npm run dev
```

---

## 🧪 Evaluation-Specific Notes

This implementation was developed as a part of a frontend assignment. The goal was to replicate a select component with nested hierarchical options and category-based grouping with features like smart input formatting and dynamic option creation.

Time Spent: ~6–7 hours due to:

- Designing recursive data traversal and filtering
- Debugging deep state update issues
- Implementing UI-level search and breadcrumb behavior

---

## 🛠️ Further Optimizations

### 1. **Search Input Enhancements**

- Sanitize user input to remove special characters.
- Prevent malformed `!{}` strings from crashing or returning incorrect paths.
- Optimize lookup by using precomputed maps (e.g., `valueMap`).

### 2. **State Management**

- Currently using `useReducer`.
- Can scale further using React Context for global state.
- Reducer can be split by action types and handlers.

### 3. **UI Performance**

- Memoization used to avoid unnecessary re-renders.
- Can be improved further by:
  - Debouncing input
  - Lazy loading children

### 4. **Accessibility**

- Keyboard navigation (Arrow Keys, Enter)
- ARIA roles and screen reader support

### 5. **API Integration (Future Scope)**

- Options can be fetched from an API rather than local data.
- Could use one API or separate APIs for categories and options.

---

## 🌐 Live URL

[Deployed App - Replace with URL]

---

## 📚 Tech Stack

- React 18+
- Vite
- CSS Modules
- useReducer, useEffect, useMemo

---

## 🙋‍♂️ Author

[Yugam Gangar](https://www.linkedin.com/in/yugamgangar)
