import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * Tema PrimeNG da MK Store: Aura com o azul-marinho da marca como cor primária.
 * As cores espelham os tokens de src/variables.scss.
 */
export const MkThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eef1f7',
      100: '#d5dbe8',
      200: '#aab6d0',
      300: '#7c8cb2',
      400: '#4f6491',
      500: '#2c4374',
      600: '#1f3360',
      700: '#17284d',
      800: '#11203f',
      900: '#0e1a33',
      950: '#080f1f'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.900}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.950}'
        },
        surface: {
          0: '#ffffff',
          50: '#faf8f4',
          100: '#f2eee6',
          200: '#e7e1d5',
          300: '#ded7c9',
          400: '#a2a7b3',
          500: '#7a8090',
          600: '#5a6172',
          700: '#3a4152',
          800: '#222839',
          900: '#0f1626',
          950: '#080c16'
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.900}',
          focusColor: '{primary.900}'
        }
      }
    }
  }
});
