# Form Components

This directory contains reusable UI components for forms and data display that follow SOLID principles.

## Components

### AmountInput
A component for entering monetary amounts with quick selection options.

### PaymentMethodSelector
A component for selecting payment methods with visual indicators.

### FeeSummary
A component for displaying transaction fee summaries with optional info buttons.

### CurrencyDisplay
A component for displaying currency values with formatting options.

### BalanceDisplay
A component for displaying account balances with optional change indicators.

### AnimatedButton
A button component with built-in press animation effects.

### DisclaimerText
A component for displaying disclaimer text with optional embedded links.

### SectionContainer
A standardized container for sections with consistent styling.

## SOLID Principles Implementation

### Single Responsibility Principle
Each component has a single responsibility:
- `AmountInput` is only responsible for amount input and quick selection
- `BalanceDisplay` is only responsible for displaying a balance with change indicator
- `SectionContainer` is only responsible for providing consistent section styling

### Open/Closed Principle
Components are open for extension but closed for modification:
- All components accept custom styles through props
- Variants can be specified through props (e.g., `SectionContainer` has a `variant` prop)
- Components can be composed together to create more complex UIs

### Liskov Substitution Principle
Components with similar purposes can be substituted for each other:
- `ThemedButton` can be replaced with `AnimatedButton` without breaking functionality
- Different display components follow consistent prop patterns

### Interface Segregation Principle
Components have focused interfaces that only expose what's needed:
- Props interfaces are specific to each component's needs
- Optional props have sensible defaults
- Complex components are broken down into smaller, more focused ones

### Dependency Inversion Principle
Components depend on abstractions rather than concrete implementations:
- Components receive data and callbacks through props rather than managing state directly
- Styling is abstracted through the theming system
- Components are agnostic about where their data comes from

## Usage Example

```tsx
<SectionContainer title="Account Balance" variant="highlight">
  <BalanceDisplay
    balance={125000}
    percentageChange={2.4}
    currencySymbol="₦"
  />
</SectionContainer>

<SectionContainer title="Payment Method">
  <PaymentMethodSelector
    paymentMethods={paymentMethods}
    selectedPaymentMethodId={selectedMethod}
    onSelectPaymentMethod={setSelectedMethod}
  />
</SectionContainer>

<AnimatedButton onPress={handleSubmit} disabled={!isValid}>
  Submit Payment
</AnimatedButton>

<DisclaimerText
  text="By proceeding, you agree to our terms and conditions"
  links={[
    {
      text: "terms and conditions",
      onPress: () => navigation.navigate('Terms')
    }
  ]}
/>
```