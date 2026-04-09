import { cache } from 'react';

import { codeToHtml } from 'shiki';

import { PortfolioLanguage } from '@/lib/types';

const languageMap: Record<PortfolioLanguage, string> = {
  tsx: 'tsx',
  html: 'html',
  js: 'javascript',
  json: 'json',
  ts: 'typescript',
  css: 'css',
  md: 'markdown',
};

export const highlightCode = cache(async (code: string, language: PortfolioLanguage) => {
  return codeToHtml(code, {
    lang: languageMap[language],
    theme: 'dark-plus',
    transformers: [
      {
        pre(node) {
          node.properties.class = 'shiki code-block';
          node.properties.style = 'background-color: transparent;';
        },
      },
    ],
  });
});
