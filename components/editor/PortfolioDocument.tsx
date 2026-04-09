import { highlightCode } from '@/lib/shiki';
import { getPortfolioFileById } from '@/lib/portfolio';

interface PortfolioDocumentProps {
  fileId: string;
}

export async function PortfolioDocument({ fileId }: PortfolioDocumentProps) {
  const file = getPortfolioFileById(fileId);
  const html = await highlightCode(file.code, file.type);
  const lineCount = file.code.split('\n').length;

  return (
    <article className="code-editor flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-2 border-b border-[var(--vscode-border)] bg-[#1b1b1b] px-4 py-1.5 text-[11px] text-[var(--vscode-muted)]">
        <span>src</span>
        <span>/</span>
        <span>content</span>
        <span>/</span>
        <span className="text-[var(--vscode-text)]">{file.name}</span>
      </header>

      <div className="min-h-0 flex-1 overflow-auto bg-[var(--vscode-bg)]">
        <div className="editor-grid min-h-full">
          <ol className="m-0 list-none border-r border-[var(--vscode-border)] bg-[#181818] px-2 py-4 text-right text-[12px] leading-7 text-[#6b6b6b]">
            {Array.from({ length: lineCount }, (_, index) => (
              <li key={index}>{index + 1}</li>
            ))}
          </ol>

          <div className="overflow-x-auto p-4">
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              aria-label={`${file.title} source`}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
