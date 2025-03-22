# Code Guidelines for Qogent Project

## String Formatting

### Rule #1: Always Use Double Quotes for Strings with Apostrophes

**This is the most important rule to prevent syntax errors.**

Always use double quotes (`"`) for strings that contain:
- Apostrophes/single quotes (`'`)
- Contractions (e.g., `don't`, `we've`, `it's`)
- Possessives (e.g., `student's`, `university's`)

```typescript
// ✅ CORRECT
const message = "We've helped thousands of students achieve their dreams";
const description = "That's how we make a difference";
const possessive = "The student's application was approved";

// ❌ INCORRECT - will cause syntax errors
const message = 'We've helped thousands of students achieve their dreams';
const description = 'That's how we make a difference';
const possessive = 'The student's application was approved';
```

### Rule #2: Use Single Quotes for Simple Strings

For strings without apostrophes or contractions, use single quotes (`'`) for consistency:

```typescript
// ✅ CORRECT
const title = 'Success Rate';
const color = 'from-violet-500 to-purple-500';

// Also acceptable but less preferred for simple strings
const title = "Success Rate";
```

### Rule #3: Be Consistent with JSX Attributes

The same rules apply to JSX attributes:

```tsx
// ✅ CORRECT
<Component 
  title='Simple Title'
  description="We've been there and done that!"
/>

// ❌ INCORRECT
<Component 
  title="Simple Title"
  description='We've been there and done that!'
/>
```

### Rule #4: Use Template Literals for Complex Strings

For complex strings with interpolation, use template literals:

```typescript
// ✅ CORRECT
const message = `Hello ${userName}, we're excited to help with your ${program} application!`;
```

### Rule #5: Handle Emojis Carefully

When including emojis in strings, be aware that they can sometimes cause parsing issues:

1. Use double quotes for strings with emojis
2. If issues persist, consider using Unicode escape sequences or removing the emoji

```typescript
// Preferred
const greeting = "Hello there! 👋";

// Alternative if needed
const greeting = "Hello there! \u{1F44B}";
```

## ESLint Configuration (Future Enhancement)

To enforce these rules automatically, we can add the following ESLint rules to our configuration:

```json
{
  "rules": {
    "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }]
  }
}
```

This configuration will:
- Prefer single quotes for most strings
- Allow double quotes when the string contains single quotes (avoidEscape)
- Allow template literals when appropriate

## VS Code Configuration

Add these settings to your VS Code workspace settings to help maintain consistency:

```json
{
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true
}
```

## Common Scenarios and Solutions

| Content | Correct Format | Incorrect Format |
|---------|---------------|-----------------|
| Simple string | `'Hello'` | |
| String with apostrophe | `"It's great"` | `'It's great'` |
| String with contraction | `"We've done it"` | `'We've done it'` |
| String with possessive | `"The user's profile"` | `'The user's profile'` |
| JSX attribute (simple) | `title='Hello'` | |
| JSX attribute (with apostrophe) | `description="It's amazing"` | `description='It's amazing'` |

Following these guidelines will help prevent syntax errors in the codebase and maintain consistency across the project. 