// Font utility file for custom fonts
// This file provides TypeScript types and helper functions for your custom fonts

export type DMSansFontVariant = 
  | 'dm-sans-light' 
  | 'dm-sans'           // Regular
  | 'dm-sans-medium'
  | 'dm-sans-semibold'
  | 'dm-sans-bold';

export type DarkerGrotesqueFontVariant = 
  | 'darker-grotesque'      // Regular
  | 'darker-grotesque-medium'
  | 'darker-grotesque-semibold'
  | 'darker-grotesque-bold'
  | 'darker-grotesque-extrabold';

export type CustomFontVariant = DMSansFontVariant | DarkerGrotesqueFontVariant;

// Helper function to get font class names
export const getFontClass = (font: CustomFontVariant): string => {
  return `font-${font}`;
};

// Font family mappings (for use with StyleSheet if needed)
export const fontFamilies = {
  // DM Sans
  'dm-sans-light': 'DMSans-Light',
  'dm-sans': 'DMSans-Regular',
  'dm-sans-medium': 'DMSans-Medium',
  'dm-sans-semibold': 'DMSans-SemiBold',
  'dm-sans-bold': 'DMSans-Bold',
  
  // Darker Grotesque
  'darker-grotesque': 'DarkerGrotesque-Regular',
  'darker-grotesque-medium': 'DarkerGrotesque-Medium',
  'darker-grotesque-semibold': 'DarkerGrotesque-SemiBold',
  'darker-grotesque-bold': 'DarkerGrotesque-Bold',
  'darker-grotesque-extrabold': 'DarkerGrotesque-ExtraBold',
} as const;

// Default font configuration
export const DEFAULT_FONT = 'DMSans-Regular';

// Helper function to get default font style for StyleSheet
export const getDefaultFontStyle = () => ({
  fontFamily: DEFAULT_FONT,
});

// Helper function to get font style for StyleSheet usage
export const getFontStyle = (font: CustomFontVariant) => ({
  fontFamily: fontFamilies[font],
});

// Common font combinations for quick use
export const fontCombinations = {
  heading: 'font-darker-grotesque-bold',
  subheading: 'font-darker-grotesque-semibold', 
  body: 'font-dm-sans',
  bodyBold: 'font-dm-sans-semibold',
  caption: 'font-dm-sans-light',
  button: 'font-dm-sans-medium',
} as const;

// Example usage:
// <Text className={getFontClass('dm-sans-bold')}>Bold DM Sans Text</Text>
// <Text className="font-darker-grotesque-medium">Medium Darker Grotesque Text</Text>
// <Text className={fontCombinations.heading}>Heading Text</Text>
// <Text style={getFontStyle('dm-sans-bold')}>StyleSheet Bold Text</Text>
